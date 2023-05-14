import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { configuration } from '../../../configuration';
import {Notification} from "../../../types";
import {removeTransaction, transactions$} from "../../../streams";
import {removeNotification} from "../../../store/actions";
import { chainStyles, networkToChainId } from '../../../utils';
import {closeCircleIcon} from "../../../icons";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})

export class NotificationComponent implements OnInit, OnDestroy{

  @Input() public notification: Notification;
  protected readonly closeIcon = closeCircleIcon;
  protected readonly configuration = configuration;
  protected readonly chainStyles = chainStyles;
  protected readonly networkToChainId = networkToChainId;
  public timeoutId: NodeJS.Timeout;
  public hovered: boolean = false;
  public readonly transaction = transactions$.getValue()
    .find(({ hash }) => hash === this.notification.id);

  constructor()  {}

  ngOnInit() {
    if(this.notification.autoDismiss){
      this.timeoutId = setTimeout(() => {
        this.removeNotification();
      }, this.notification.autoDismiss);
    }
  }

  public removeNotification(): void {
    removeNotification(this.notification.id)
    removeTransaction(this.notification.id)
  }

  public onClick(event){
   return this.notification.onClick && this.notification.onClick(event)
  }
  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

}


