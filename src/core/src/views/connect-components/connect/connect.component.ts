import {Component, Input, OnInit} from '@angular/core';
import {AccountCenter, AppState, ConnectOptions, WalletState, WalletWithLoadingIcon} from "../../../types";
import {configuration} from "../../../configuration";
import {state} from "../../../store";
import {BehaviorSubject, distinctUntilChanged, firstValueFrom, Observable, startWith, Subject} from "rxjs";
import {STORAGE_KEYS} from "../../../constants";
import {connectWallet$} from "../../../streams";
import {filter, mapTo, shareReplay, take, takeUntil} from "rxjs/operators";
import {addWallet, updateAccount} from "../../../store/actions";
import {BigNumber} from "ethers";
import EventEmitter from "eventemitter3";
import {getBalance, getChainId, listenAccountsChanged, requestAccounts, trackWallet} from "../../../provider";
import {getLocalStore, setLocalStore} from "../../../utils";
import {getBNMulitChainSdk} from "../../../services";
import {ProviderRpcErrorCode, WalletModule} from "../../../../../common";
import {closeCircleIcon, infoIcon, poweredByBee} from '../../../icons';
import {Destroyable} from "../../../destroyable.base";
import {getTranslations, Translation} from "../../../locales";

@Component({
  selector: 'connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})

export class ConnectComponent extends Destroyable implements OnInit {

  @Input() public autoSelect: ConnectOptions['autoSelect'];

  protected readonly translation: Translation =  getTranslations();
  protected readonly poweredByBee: string = poweredByBee;
  protected readonly infoIcon: string = infoIcon;
  protected readonly closeIcon = closeCircleIcon;
  public readonly state: AppState = state.get();
  public step: any;
  public isAccountCenterConnect: boolean = false;
  public cancelPreviousConnect$: Subject<void> = new Subject<void>();
  public connectionRejected: boolean = false;
  public previousConnectionRequest: boolean = false;
  public wallets: WalletWithLoadingIcon[] = [];
  public selectedWallet: WalletState | null;
  public agreed: boolean;
  public connectingWalletLabel: string;
  public connectingErrorMessage: string;
  public availableWallets: number;
  public displayConnectingWallet: any;

  protected readonly accountCenter$: Observable<AccountCenter> = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1));

  public modalStep$ = new BehaviorSubject<any>(
    'selectingWallet'
  )

  constructor()  {
    super();
  }

  ngOnInit() {
    this.connectWalletListener();
    this.modalStepListener();
  }

  private connectWalletListener(): void {
    connectWallet$.pipe(distinctUntilChanged(
        (prev, curr) =>
          prev.autoSelect &&
          curr.autoSelect &&
          prev.autoSelect.disableModals === curr.autoSelect.disableModals),
          filter(({ autoSelect }) => autoSelect && autoSelect.disableModals === false),
          takeUntil(this.unsubscribe$))
          .subscribe((res) => {
          setTimeout(() => this.isAccountCenterConnect = res.inProgress)
          this.selectedWallet && this.connectWallet();
      });
  }
  private modalStepListener(): void {
    this.modalStep$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe( step => {
      this.step = step;
      switch (step) {
        case 'selectingWallet': {
          if (this.autoSelect.label) {
            const walletToAutoSelect = this.state.walletModules.find(
              ({ label }) =>
                label.toLowerCase() === this.autoSelect.label.toLowerCase()
            )

            if (walletToAutoSelect) {
              this.autoSelectWallet(walletToAutoSelect)
            } else if (this.autoSelect.disableModals) {
              connectWallet$.next({ inProgress: false })
            }
          } else {
            this.connectingWalletLabel = ''
            this.loadWalletsForSelection();
          }
          break
        }
        case 'connectingWallet': {
          this.connectWallet();
          break
        }
        case 'connectedWallet': {
          this.connectingWalletLabel = ''
          this.updateAccountDetails();
          break
        }
      }
      this.availableWallets = this.wallets.length - state.get().wallets.length;
      this.displayConnectingWallet = (step=== 'connectingWallet' && this.selectedWallet) ||
        (this.connectionRejected && step === 'connectingWallet' && this.selectedWallet)

    })
  }

  // ==== SELECT WALLET ==== //
  public async selectWallet({label, icon, getInterface}: WalletWithLoadingIcon): Promise<void> {
    this.connectingWalletLabel = label;

    try {
      const existingWallet = state.get()
        .wallets.find(wallet => wallet.label === label)
      if (existingWallet) {
        // set as first wallet
        addWallet(existingWallet)
        setTimeout(() => this.setStep('connectedWallet'), 1)
        this.selectedWallet = existingWallet
        return
      }
      const { chains } = state.get()
      const { provider, instance } = await getInterface({
        chains,
        BigNumber,
        EventEmitter,
        appMetadata: configuration.appMetadata
      })
      const loadedIcon = await icon;
      this.selectedWallet = {
        label,
        icon: loadedIcon,
        provider,
        instance,
        accounts: [],
        chains: [{ namespace: 'evm', id: '0x1' }]
      }
      this.connectingErrorMessage = '';
      // change step on next event loop
      setTimeout(() => this.setStep('connectingWallet'), 200);
    } catch (error) {
      const { message } = error as { message: string };
      this.connectingErrorMessage = message;
      this.connectingWalletLabel = '';
    }
  }
  public deselectWallet($event: any): void {
    this.selectedWallet = null;
  }
  private updateSelectedWallet(update: Partial<WalletState> | WalletState): void {
    this.selectedWallet = { ...this.selectedWallet, ...update }
  }
  private async autoSelectWallet(wallet: WalletModule): Promise<void> {
    const { getIcon, getInterface, label } = wallet;
    const icon = getIcon();
    await this.selectWallet({ label, icon, getInterface });
  }
  private async loadWalletsForSelection(): Promise<void> {
    this.wallets = this.state.walletModules.map(({ getIcon, getInterface, label }) => {
      return {
        label,
        icon: getIcon(),
        getInterface
      }
    })
  }
  public close(): void {
    this.isAccountCenterConnect = false;
    setTimeout(() => {connectWallet$.next({ inProgress: false })}, 500);
  };

  // ==== CONNECT WALLET ==== //
  public async connectWallet(): Promise<void> {
    this.connectionRejected = false;
    const { provider, label } = this.selectedWallet
    this.cancelPreviousConnect$.next()
    try {
      const [address] = await Promise.race([
        // resolved account
        requestAccounts(provider),
        // or connect wallet is called again whilst waiting for response
        firstValueFrom(this.cancelPreviousConnect$.pipe(mapTo([])))
      ])
      // canceled previous request
      if (!address) {
        return
      }
      // store last connected wallet
      if (state.get().connect.autoConnectLastWallet || state.get().connect.autoConnectAllPreviousWallet) {
        let labelsList: string | Array<String> = getLocalStore(
          STORAGE_KEYS.LAST_CONNECTED_WALLET
        )

        try {
          let labelsListParsed: Array<String> = JSON.parse(labelsList)
          if (labelsListParsed && Array.isArray(labelsListParsed)) {
            const tempLabels = labelsListParsed
            labelsList = [...new Set([label, ...tempLabels])]
          }
        } catch (err) {
          if (
            err instanceof SyntaxError &&
            labelsList &&
            typeof labelsList === 'string'
          ) {
            const tempLabel = labelsList
            labelsList = [tempLabel]
          } else {
            throw new Error(err as string);
          }
        }

        if (!labelsList) labelsList = [label]
        setLocalStore(
          STORAGE_KEYS.LAST_CONNECTED_WALLET,
          JSON.stringify(labelsList)
        )
      }
      const chain = await getChainId(provider)
      if (state.get().notify.enabled) {
        const sdk = await getBNMulitChainSdk()
        if (sdk) {
          try {
            sdk.subscribe({
              id: address,
              chainId: chain,
              type: 'account'
            })
          } catch (error) {
            // unsupported network for transaction events
          }
        }
      }

      const update: Pick<WalletState, 'accounts' | 'chains'> = {
        accounts: [{ address, balance: null }],
        chains: [{ namespace: 'evm', id: chain }]
      }

      addWallet({ ...this.selectedWallet, ...update })
      trackWallet(provider, label)
      this.updateSelectedWallet(update)
      this.setStep('connectedWallet')
    } catch (error) {
      const { code } = error as { code: number; message: string }

      // user rejected account access
      if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED) {
        this.connectionRejected = true

        if (this.autoSelect.disableModals) {
          connectWallet$.next({ inProgress: false })
        } else if (this.autoSelect.label) {
          this.autoSelect.label = ''
        }

        return
      }

      // account access has already been requested and is awaiting approval
      if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_ALREADY_REQUESTED) {
        this.previousConnectionRequest = true

        if (this.autoSelect.disableModals) {
          connectWallet$.next({ inProgress: false })
          return
        }

        listenAccountsChanged({
          provider: this.selectedWallet.provider,
          disconnected$: connectWallet$.pipe(
            filter(({ inProgress }) => !inProgress),
            mapTo('')
          )
        })
          .pipe(take(1))
          .subscribe(([account]) => {
            account && this.connectWallet()
          })

        return
      }
    }
  }

  // ==== CONNECTED WALLET ==== //
  private async updateAccountDetails(): Promise<void> {
    const { accounts, chains: selectedWalletChains } = this.selectedWallet
    const appChains = state.get().chains
    const [connectedWalletChain] = selectedWalletChains

    const appChain = appChains.find(
      ({ namespace, id }) =>
        namespace === connectedWalletChain.namespace &&
        id === connectedWalletChain.id
    )

    const { address } = accounts[0]
    let { balance } = accounts[0]
    if (balance === null) {
      getBalance(address, appChain).then(balance => {
        updateAccount(this.selectedWallet.label, address, {
          balance
        })
      })
    }
    setTimeout(() => connectWallet$.next({ inProgress: false }), 1500);
  }

  public setStep(update: any): void {
  this.cancelPreviousConnect$.next();
  this.modalStep$.next(update);
  }

}


