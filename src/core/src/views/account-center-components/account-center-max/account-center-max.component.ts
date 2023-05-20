import {ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import { configuration } from '../../../configuration';
import {state} from "../../../store";
import { wallets$ } from '../../../streams';
import {Account, AccountCenter, AppState, ChainStyle, Configuration, ConnectedChain, WalletState} from "../../../types";
import {Observable, startWith, Subject} from "rxjs";
import disconnect from "../../../disconnect";
import connect from '../../../connect';
import {
  poweredByBee,
  plusCircleIcon,
  arrowForwardIcon,
  successIcon,
  warningIcon,
  questionIcon
} from "../../../icons";
import {updateAccountCenter} from "../../../store/actions";
import {shareReplay, takeUntil} from "rxjs/operators";
import {getDefaultChainStyles, shortenAddress, unrecognizedChainStyle} from "../../../utils";
import {Chain} from "../../../../../common";
import {getTranslations, Translation} from "../../../locales";
import {Destroyable} from "../../../destroyable.base";
@Component({
  selector: 'account-center-max',
  templateUrl: './account-center-max.component.html',
  styleUrls: ['./account-center-max.component.scss'],
})

export class AccountCenterMaxComponent extends Destroyable implements OnInit {

  public wallets: WalletState[];
  public isAccountCenterMax: boolean = false;
  public isSettings: boolean = false;
  protected chains: Chain[] = state.get().chains;
  protected readonly questionIcon: string = questionIcon;
  protected readonly translation: Translation = getTranslations();
  protected readonly state: AppState = state.get();
  protected readonly configuration: Configuration = configuration;
  protected readonly unrecognizedChainStyle: {icon: string, color: string} = unrecognizedChainStyle;
  protected readonly poweredByBee: string = poweredByBee;
  protected readonly plusCircleIcon: string = plusCircleIcon;
  protected readonly arrowForwardIcon: string = arrowForwardIcon;
  protected readonly successIcon: string = successIcon;
  protected readonly warningIcon: string = warningIcon;
  public changeSettingsEventsSubject: Subject<void> = new Subject<void>();
  protected readonly accountCenter$:Observable<AccountCenter> = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))
  constructor(public changeDetectorRef: ChangeDetectorRef)  {
    super()
  }

  ngOnInit() {
    wallets$.pipe(takeUntil(this.unsubscribe$)).subscribe((wallets: WalletState[]) => {
      this.wallets = wallets;
      this.changeDetectorRef.detectChanges();
    })
    this.accountCenter$.pipe(takeUntil(this.unsubscribe$)).subscribe((accountCenter: AccountCenter) => {
      setTimeout(() => {
        this.isAccountCenterMax = accountCenter.expanded});
    })
  }

  public disconnectAllWallets(): void {
    this.wallets.forEach(({ label }) => disconnect({ label }))
  }
  public async connect():Promise<WalletState[]> {
    return connect();
  }


  public close(event?:any): void {
    if(event && event.target.id ==='save-btn') {
      this.isSettings = false;
      this.changeSettingsEventsSubject.next();
    } else {
      if(this.isAccountCenterMax && !this.isSettings){
        this.isAccountCenterMax = false;
        setTimeout(() => {
          updateAccountCenter({ expanded: false })
        },200);
      }
    }
  }


  public get primaryChain() : ConnectedChain | null  {
    return this.wallets[0] && this.wallets[0].chains[0]
  }
  public get defaultChainStyles():ChainStyle {
    return getDefaultChainStyles(this.primaryChain && this.primaryChain.id)
  }


  public get validAppChain(): Chain {
    return this.chains.find(({ id, namespace }) =>
      this.primaryChain ? id ===  this.primaryChain.id && namespace ===  this.primaryChain.namespace : false);
  }


  public get primaryWallet(): WalletState | null  {
    return this.wallets ? this.wallets[0] : null;
  }
  public get firstAccount(): Account | null {
    return this.primaryWallet ? this.primaryWallet.accounts[0] : null;
  }


  public get shortenedFirstAddress(): string {
    return this.firstAccount ? shortenAddress(this.firstAccount.address): '';
  }
  public get firstAddressAsset(): string {
    return this.firstAccount && this.firstAccount.balance
      ? Object.keys(this.firstAccount.balance)[0]
      : '';
  }
  public get firstAddressBalance(): string | null {
    return this.firstAccount && this.firstAccount.balance
      ? this.firstAccount.balance[this.firstAddressAsset]
      : null
  }

  public toggleSettings(event): void {
    event.stopPropagation();
    this.isSettings = !this.isSettings;
    if(!this.isSettings) {
      this.changeSettingsEventsSubject.next();
    }
  }


}


