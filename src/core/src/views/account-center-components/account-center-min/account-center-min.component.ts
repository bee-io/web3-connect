import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { configuration } from '../../../configuration';
import {state} from "../../../store";
import { wallets$ } from '../../../streams';
import {updateAccountCenter} from "../../../store/actions";
import { questionIcon, successIcon, warningIcon} from "../../../icons";
import {getDefaultChainStyles, shortenAddress, unrecognizedChainStyle} from '../../../utils';
import {Account, ChainStyle, Configuration, ConnectedChain, WalletState} from "../../../types";
import {Chain} from "../../../../../common";
import {takeUntil} from "rxjs/operators";
import {Destroyable} from "../../../destroyable.base";

@Component({
  selector: 'account-center-min',
  templateUrl: './account-center-min.component.html',
  styleUrls: ['./account-center-min.component.scss'],
})

export class AccountCenterMinComponent extends Destroyable implements OnInit {

  public wallets: WalletState[];
  protected chains = state.get().chains;
  protected readonly configuration: Configuration = configuration;
  protected readonly appIcon: string = (this.configuration.appMetadata && this.configuration.appMetadata.icon) || questionIcon
  protected readonly successIcon: string = successIcon;
  protected readonly warningIcon: string = warningIcon;
  protected readonly unrecognizedChainStyle:  { icon: string, color: string } = unrecognizedChainStyle;

  constructor(public changeDetectorRef: ChangeDetectorRef)  {
    super();
  }
  ngOnInit() {
   wallets$.pipe(takeUntil(this.unsubscribe$)).subscribe((wallets: WalletState[]) => {
     this.wallets = wallets;
     this.changeDetectorRef.detectChanges();
    })
  }

  public maximize(): void {
    updateAccountCenter({ expanded: true })
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
}


