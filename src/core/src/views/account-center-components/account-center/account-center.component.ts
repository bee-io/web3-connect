import {Component} from '@angular/core';
import {state} from "../../../store";
import {shareReplay} from "rxjs/operators";
import {Observable, startWith} from "rxjs";
import { wallets$ } from '../../../streams';
import {AccountCenter, WalletState} from "../../../types";

@Component({
  selector: 'account-center',
  templateUrl: './account-center.component.html',
  styleUrls: ['./account-center.component.scss'],
})

export class AccountCenterComponent {

  protected readonly wallets$:Observable<WalletState[]> = wallets$;
  protected readonly accountCenter$:Observable<AccountCenter> = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1));

}


