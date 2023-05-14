import {Component} from '@angular/core';
import {configuration} from "../../../configuration";
import {Configuration} from "../../../types";
import {getTranslations, Translation} from "../../../locales";

@Component({
  selector: 'install-wallet',
  templateUrl: './install-wallet.component.html',
  styleUrls: ['./install-wallet.component.scss'],
})

export class InstallWalletComponent{
  protected readonly configuration: Configuration = configuration;
  protected readonly translation: Translation = getTranslations();

}


