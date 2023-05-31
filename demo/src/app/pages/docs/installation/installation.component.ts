import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../app.service";
import {HighlightService} from "../../../share/services/highlight.service";


@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  preserveWhitespaces: false
})
export class InstallationComponent implements AfterViewChecked {

public readonly testOutHTML: string = `$ git clone git@github.com:bee-io/web3-connect.git
$ cd web3-connect
$ yarn install
$ npm run demo
`

public readonly installHTML: string = `$ ng new PROJECT_NAME
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

public readonly configureWalletsHTML: string = `import {Init, injectedModule} from "@b-ee/web3-connect";

const injected = injectedModule()

const wallets = [injected]`

public readonly configureChainsHTML: string = `const INFURA_ID = '...';
const chains = [
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/' + INFURA_ID
  },
  {
    id: 137,
    token: 'MATIC',
    label: 'Matic Mainnet',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
  }
]`
public readonly configureAppMetadataHTML: string = `<xmp>const appMetaData = {
  name: 'My App',
  icon: '<SVG_ICON_STRING>',
  logo: '<SVG_LOGO_STRING>',
  description: 'My app using Web3 Connect',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' }
  ],
  agreement: {
   version: '1.0.0',
   termsUrl: 'https://termsUrl',
   privacyUrl: 'https://privacyUrl'
  },
  gettingStartedGuide: 'https://your-site',
  explore: 'https://your-site/contract'
}</xmp>`

public readonly InitializeHTML: string = `<xmp>@Component({
  selector: 'app-root',
  template: \`<web3-connect></web3-connect>
             <button (click)="connect()"></button>\`,
})

export class AppComponent {

  private web3Connect = Init({
    locale: 'en' // default,
    wallets,
    chains,
    appMetaData
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



