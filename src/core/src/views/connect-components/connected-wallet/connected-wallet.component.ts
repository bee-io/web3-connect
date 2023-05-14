import {Component,Input} from '@angular/core';
import {Configuration, WalletState} from "../../../types";
import {configuration} from "../../../configuration";
import {questionIcon, successIcon} from "../../../icons";
import {getTranslations, Translation} from "../../../locales";


@Component({
  selector: 'connected-wallet',
  templateUrl: './connected-wallet.component.html',
  styleUrls: ['./connected-wallet.component.scss'],
})

export class ConnectedWalletComponent {

  @Input() public selectedWallet: WalletState;
  protected readonly translation: Translation = getTranslations();
  protected readonly configuration:Configuration = configuration;
  protected readonly questionIcon: string = questionIcon;
  protected readonly successIcon: string = successIcon;

}


