/**
 * TIPS：Home
 */
import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as Flickity from 'flickity';
import {HighlightService} from "../../share/services/highlight.service";
import {takeUntil} from "rxjs/operators";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  private highlighted: boolean = false;
  public readonly themeableHTML: string = `:root {
    --b-ee-background-color: '#1A1D26';
    --b-ee-foreground-color: '#242835';
    --b-ee-text-color: '#EFF1FC';
    --b-ee-border-color: '#33394B';
    --b-ee-action-color: '#929bed';
    --b-ee-border-radius: '16px';
    --b-ee-font-family: 'inherit';
 }
`
  public readonly importModuleHTML: string = `/** import Web3ConnectModule **/
import { Web3ConnectModule } from '@b-ee/web3-connect';

/** include Web3ConnectModule to imports **/
@NgModule({
  imports: [Web3ConnectModule]
})

export class AppModule { }
`
  public readonly initializeAppHTML: string = `<xmp>import { Init, injectedModule } from '@b-ee/web3-connect';
const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/INFURA_KEY';

@Component({
  selector: 'app-root',
  template: \`<web3-connect></web3-connect>
             <button (click)="connect()"></button>\`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  private injected = injectedModule();

  private web3Connect = Init({
    wallets: [ this.injected ],
    chains: [{
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }]
  });

  async connect() {
    const wallets = await this.web3Connect.connectWallet();
    console.log(wallets);
  }
}
</xmp>`

  constructor( public appService: AppService, private highlightService: HighlightService) {}

  ngOnInit() {
  }

  ngAfterContentInit() {
    // const themeCarousel = document.querySelector('.theme-carousel');
    // new Flickity( themeCarousel, {
    //   contain: true,
    //   wrapAround: true,
    //   autoPlay: true,
    //   percentPosition: false,
    // });
    const networkChainCarousel = document.querySelector('.network-chain-carousel');
    new Flickity( networkChainCarousel, {
      contain: true,
      wrapAround: true,
      autoPlay: false,
      percentPosition: false,
    });

  }
  public ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }

  public scrollTo(el: HTMLElement): void {
    el.scrollIntoView();
  }
}
