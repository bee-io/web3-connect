import {Component} from '@angular/core';
import { connectWallet$, wallets$} from '../streams'
import {state} from "../store";
import {BehaviorSubject, Observable, startWith} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {AccountCenter, Configuration, ConnectWalletState, Notification, Notify, WalletState} from "../types";
import { configuration } from '../configuration';
@Component({
  selector: 'web3-connect',
  templateUrl: './web3-connect.component.html',
  styleUrls: ['./web3-connect.component.scss'],
})

export class Web3ConnectComponent {

  protected readonly wallets$: Observable<WalletState[]> = wallets$;
  protected readonly connectWallet$:BehaviorSubject<ConnectWalletState> = connectWallet$;
  protected readonly configuration: Configuration = configuration;
  protected readonly accountCenterPositioning: string = 'account-center';

  protected readonly accountCenter$: Observable<AccountCenter> = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1));

  protected readonly  notify$: Observable<Notify> = state
    .select('notify')
    .pipe(startWith(state.get().notify), shareReplay(1));

  protected readonly notifications$: Observable<Notification[]> = state
    .select('notifications')
    .pipe(startWith(state.get().notifications));



  constructor() {}

  public setPositioningDefaults = (targetComponentVariable: string) => {
    return {
      topLeft: `
        top: var(--${targetComponentVariable}-position-top, 0);
        left: var(--${targetComponentVariable}-position-left, 0);`,
      topRight: `
        top: var(--${targetComponentVariable}-position-top, 0);
        right: var(--${targetComponentVariable}-position-right, 0);`,
      bottomRight: `
        bottom: var(--${targetComponentVariable}-position-bottom, 0);
        right: var(--${targetComponentVariable}-position-right, 0);`,
      bottomLeft: `
        bottom: var(--${targetComponentVariable}-position-bottom, 0);
        left: var(--${targetComponentVariable}-position-left, 0);`
    }
  }
}


