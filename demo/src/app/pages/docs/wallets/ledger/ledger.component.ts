import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  preserveWhitespaces: false
})
export class LedgerComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {ledgerModule, Init } from "@b-ee/web3-connect";

const ledger = ledgerModule();
`
public readonly customOptions: string = `interface LedgerOptions {
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}
`

public readonly customUsage: string = `import {ledgerModule, Init } from "@b-ee/web3-connect";

const ledger = ledgerModule();

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    ledger
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



