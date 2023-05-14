import {Component, Input} from '@angular/core';
import {pendingIcon} from "../../../icons";

@Component({
  selector: 'web3-connect-badge',
  templateUrl: './web3-connect-badge.component.html',
  styleUrls: ['./web3-connect-badge.component.scss'],
})

export class Web3ConnectBadgeComponent {

  public pendingIcon: string = pendingIcon;
  @Input() public icon?: string;
  @Input() public iconPromise?: Promise<string>;
  @Input() public iconName: string;
  @Input() public width: string;
  @Input() public height: string;
  @Input() public loading: boolean = false;
  @Input() public customBackgroundColor?: string = '';
  @Input() public size?: number = 0;
  @Input() public color?: string = 'black'
  @Input() public radius?: number = 12;
  @Input() public padding?: number = this.size / 6
  @Input() public border: string;
  @Input() public background: string;


}


