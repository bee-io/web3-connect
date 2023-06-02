import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {disconnect, WalletState } from "@b-ee/web3-connect";
import {AppService, SiteTheme} from "../../app.service";
import {Destroyable} from "../../utils/destroyable.base";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-connect-btn',
  templateUrl: './connect-btn.component.html',
  styleUrls: ['./connect-btn.component.scss']
})
export class ConnectBtnComponent extends Destroyable implements OnInit, OnDestroy {

  public wallets: WalletState[] = [];
  @Input() btnText: string = "Connect";
  public isLoading: boolean;

  constructor(public appService: AppService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      const theme = localStorage.getItem('site-theme') as SiteTheme
      this.updateTheme(theme);
    },1000);
    this.appService.theme$.pipe(takeUntil(this.unsubscribe$)).subscribe((theme: SiteTheme) => {
      this.updateTheme(theme);
    })
  }

  async connect(): Promise<void> {
    this.isLoading = true;
    this.wallets = await this.appService.web3Connect.connectWallet();
    this.isLoading = false;
  }

  public disconnectAllWallets(): void {
    this.wallets.forEach(({ label }) => disconnect({ label }))
    this.wallets = [];
  }

  public updateTheme = (selectedTheme: SiteTheme): void => {
    this.appService.web3Connect.state.actions.updateTheme(selectedTheme);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.disconnectAllWallets();
  }

}
