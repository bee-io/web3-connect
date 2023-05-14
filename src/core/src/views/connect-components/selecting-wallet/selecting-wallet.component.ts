import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WalletWithLoadingIcon} from "../../../types";
import {state} from "../../../store";
@Component({
  selector: 'selecting-wallet',
  templateUrl: './selecting-wallet.component.html',
  styleUrls: ['./selecting-wallet.component.scss'],
})

export class SelectingWalletComponent {
  protected readonly wheresMyWalletDefault = 'https://www.blocknative.com/blog/metamask-wont-connect-web3-wallet-troubleshooting'

  @Input() public wallets: WalletWithLoadingIcon[];
  @Input() public connectingWalletLabel: string
  @Input() public connectingErrorMessage: string
  @Output() public selectWallet:EventEmitter<WalletWithLoadingIcon> = new EventEmitter();
  constructor()  {}
  public checkConnected(label: string): boolean {
    const { wallets } = state.get();
    return !!wallets.find(wallet => wallet.label === label);
  }

}


