import {Component, Input} from '@angular/core';

@Component({
  selector: 'notification-chain',
  templateUrl: './notification-chain.component.html',
  styleUrls: ['./notification-chain.component.scss'],
})

export class NotificationChainComponent {

  @Input() public icon: string;
  @Input() public borderColorVar: string;
  @Input() public size: number;
  @Input() public padding: number = 0;
  @Input() public background: string = 'transparent';

}


