import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-xdefi',
  templateUrl: './xdefi.component.html',
  preserveWhitespaces: false
})
export class XdefiComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {xdefiWalletModule, Init } from "@b-ee/web3-connect";

const xdefi = xdefiWalletModule();
`

public readonly customUsage: string = `import {xdefiWalletModule, Init } from "@b-ee/web3-connect";

const xdefi = xdefiWalletModule();

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    xdefi
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



