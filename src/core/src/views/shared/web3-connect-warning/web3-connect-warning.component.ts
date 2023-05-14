import {Component, Input} from '@angular/core';
import {infoIcon} from "../../../icons";

@Component({
  selector: 'web3-connect-warning',
  templateUrl: './web3-connect-warning.component.html',
  styleUrls: ['./web3-connect-warning.component.scss'],
})

export class Web3ConnectWarningComponent {
  public infoIcon: string = infoIcon;

  @Input() public message?: string;
  @Input() public linkText?: string
  @Input() public linkHref?: string
  @Input() public isInstallWallet?: boolean

}


