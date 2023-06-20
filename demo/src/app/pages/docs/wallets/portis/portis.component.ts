import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-portis',
  templateUrl: './portis.component.html',
  preserveWhitespaces: false
})
export class PortisComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {portisModule, Init } from "@b-ee/web3-connect";

const portis = portisModule({ apiKey: 'API_KEY' });
`
public readonly customOptions: string = `type PortisOptions {
  apiKey: string // required
}
`

public readonly customUsage: string = `import {portisModule, Init } from "@b-ee/web3-connect";

const portis = portisModule({ apiKey: 'API_KEY' });

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    portis
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



