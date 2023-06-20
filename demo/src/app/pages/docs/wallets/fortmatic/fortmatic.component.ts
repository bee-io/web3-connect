import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-fortmatic',
  templateUrl: './fortmatic.component.html',
  preserveWhitespaces: false
})
export class FortmaticComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {fortmaticModule, Init } from "@b-ee/web3-connect";

const fortmatic = fortmaticModule({
 apiKey: 'API_KEY'
});
`
public readonly customOptions: string = `type FortmaticOptions = {
  apiKey: string
}
`

public readonly customUsage: string = `import {fortmaticModule, Init } from "@b-ee/web3-connect";

const fortmatic = fortmaticModule({
 apiKey: 'API_KEY'
})

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    fortmatic
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



