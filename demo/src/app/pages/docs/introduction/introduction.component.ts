import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../app.service";
import {HighlightService} from "../../../share/services/highlight.service";
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  preserveWhitespaces: false
})
export class IntroductionComponent implements AfterViewChecked {

public readonly testOutHTML: string = `$ git clone git@github.com:bee-io/web3-connect.git
$ cd web3-connect
$ yarn install
$ npm run demo
`
public readonly quickstartHTML: string = `$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add @b-ee/web3-connect
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

private highlighted: boolean = false;

  constructor(public appService: AppService, private highlightService: HighlightService) {}


  public ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }

  goLink(link: string) {
    if (window) {
      window.location.hash = link;
    }
  }
}



