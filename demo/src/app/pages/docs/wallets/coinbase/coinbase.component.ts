import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-coinbase',
  templateUrl: './coinbase.component.html',
  preserveWhitespaces: false
})
export class CoinbaseComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {coinbaseModule, Init } from "@b-ee/web3-connect";

const coinbaseWalletSdk = coinbaseModule();
`
public readonly customOptions: string = `type CoinbaseWalletOptions = {
  darkMode: boolean // default = false
}
`

public readonly customUsage: string = `import {coinbaseModule, Init } from "@b-ee/web3-connect";

// initialize the module with options
const coinbaseWalletSdk = coinbaseModule({ darkMode: true });

// can also initialize with no options...
// const coinbaseWalletSdk = coinbaseWalletSdk();

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    coinbaseWalletSdk
    //... other wallets
  ]
});

async connect() {
  const connectedWallets = await web3Connect.connectWallet();
  console.log(connectedWallets);
}
`

private highlighted: boolean = false;
  constructor(public appService: AppService, private highlightService: HighlightService) {}

  public ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }

  public goLink(link: string): void  {
    if (window) {
      window.location.hash = link;
    }
  }
}



