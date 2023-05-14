import {Component, Input} from '@angular/core';
import {Notification} from "../../../types";

@Component({
  selector: 'notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.scss'],
})

export class NotificationContentComponent {

  @Input() public notification:  Notification;

}


