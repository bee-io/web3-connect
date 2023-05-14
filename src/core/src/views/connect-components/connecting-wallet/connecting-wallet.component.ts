import {Component, EventEmitter, Input, Output} from '@angular/core';
import { configuration } from '../../../configuration';
import { questionIcon } from '../../../icons';
import {Configuration, WalletState} from "../../../types";
import {getTranslations, Translation} from "../../../locales";

@Component({
  selector: 'connecting-wallet',
  templateUrl: './connecting-wallet.component.html',
  styleUrls: ['./connecting-wallet.component.scss'],
})

export class ConnectingWalletComponent{

  @Input() public connectionRejected: boolean;
  @Input() public previousConnectionRequest: boolean;
  @Input() public selectedWallet: WalletState;
  @Output() public connectWallet:EventEmitter<void> = new EventEmitter();
  @Output() public deselectWallet:EventEmitter<string> = new EventEmitter();
  @Output() public setStep:EventEmitter<any> = new EventEmitter();
  protected readonly translation: Translation = getTranslations();
  protected readonly configuration: Configuration = configuration;
  protected readonly questionIcon: string = questionIcon;

}


