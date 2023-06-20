import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  preserveWhitespaces: false
})
export class SequenceComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {sequenceModule, Init } from "@b-ee/web3-connect";

const sequence = sequenceModule();
`

public readonly customUsage: string = `import {sequenceModule, Init } from "@b-ee/web3-connect";

const sequence = sequenceModule();

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    sequence
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



