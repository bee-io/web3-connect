import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Chain} from "../../../../../common";
import {WalletState} from "../../../types";
import {BehaviorSubject} from "rxjs";
import setChain from "../../../chain";
import {chainIdToLabel, connectedToValidAppChain } from '../../../utils';
import {takeUntil} from "rxjs/operators";
import {wallets$} from "../../../streams";
import {Destroyable} from "../../../destroyable.base";
import {getTranslations, Translation} from "../../../locales";

@Component({
  selector: 'web3-connect-network-select',
  templateUrl: './web3-connect-network-select.component.html',
  styleUrls: ['./web3-connect-network-select.component.scss'],
})

export class Web3ConnectNetworkSelectComponent extends Destroyable implements OnInit {

  @Input() public chains?: Chain[];
  @Input() public wallet?: WalletState;
  @Input() public color?: string;
  protected readonly translation: Translation = getTranslations();
  protected readonly chainIdToLabel: Record<string, string> = chainIdToLabel;
  protected readonly switching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public selectedValue: string;
  constructor(public changeDetectorRef: ChangeDetectorRef)  {
    super();
  }
  ngOnInit(): void {
   this.selectedValue = this.wallet.chains[0].id;
    wallets$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.selectedValue = this.wallet.chains[0].id;
      this.changeDetectorRef.detectChanges();
    })
  }
  public async handleSelect(): Promise<void> {
      const selectedChain = this.selectedValue;
      if (selectedChain !== this.wallet.chains[0].id) {
        this.switching$.next(true);
        await setChain({
          chainId: selectedChain,
          chainNamespace: 'evm',
          wallet: this.wallet.label
        })
        this.switching$.next(false);
      }
    }
  public get connectedToValidAppChain(): boolean {
    return connectedToValidAppChain(this.wallet.chains[0], this.chains);
  }

}


