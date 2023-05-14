import {Component, Input} from '@angular/core';
import {ChainStyle, Notification} from "../../../types";
import {defaultNotifyEventStyles} from "../../../utils";

@Component({
  selector: 'notification-status',
  templateUrl: './notification-status.component.html',
  styleUrls: ['./notification-status.component.scss'],
})

export class NotificationStatusComponent {
  protected readonly defaultNotifyEventStyles = defaultNotifyEventStyles;

  @Input()  notification: Notification;
  @Input()  chainStyles: ChainStyle;

}


