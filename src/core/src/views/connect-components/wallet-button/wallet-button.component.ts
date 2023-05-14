import {Component, EventEmitter, Input, Output} from '@angular/core';
import {successIcon} from "../../../icons";

@Component({
  selector: 'wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.scss'],
})

export class WalletButtonComponent {

  public successIcon: string = successIcon;
  @Input() public connected: boolean;
  @Input() public connecting: boolean;
  @Input() public disabled: boolean;
  @Input() public label: string
  @Input() public icon: Promise<string>
  @Output() public onClick: EventEmitter<void> = new EventEmitter();
}


