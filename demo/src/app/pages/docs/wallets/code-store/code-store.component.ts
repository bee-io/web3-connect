import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-code-store',
  templateUrl: './code-store.component.html',
  preserveWhitespaces: false
})
export class CodeStoreComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {cedeStoreModule, Init } from "@b-ee/web3-connect";

const cedeStore = cedeStoreModule();
`

public readonly customUsage: string = `import {cedeStoreModule, Init } from "@b-ee/web3-connect";

const cedeStore = cedeStoreModule();

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    cedeStore
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
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  public goLink(link: string): void  {
    if (window) {
      window.location.hash = link;
    }
  }
}



