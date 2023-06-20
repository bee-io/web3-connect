import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  preserveWhitespaces: false
})
export class WalletConnectComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {walletConnectModule, Init } from "@b-ee/web3-connect";

const walletConnect = walletConnectModule({
    connectFirstChainId: true,
    version: 2,
    projectId: 'abc123...',
  })
`
public readonly customOptions: string = `<xmp>type WalletConnectOptions = {
  bridge?: string // default = 'https://bridge.walletconnect.org'
  qrcodeModalOptions?: {
    mobileLinks: string[] // set the order and list of mobile linking wallets
  }
  connectFirstChainId?: boolean // if true, connects to the first network chain provided
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
} & (
  | {
      /**
       * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
       */
      version?: 1
    }
  | {
      /**
       * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
       */
      projectId: string
      /**
       * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
       */
      version: 2
      /**
       * List of Required Chain(s) ID for wallets to support in number format (integer or hex)
       * Defaults to [1] - Ethereum
       * The chains defined within the web3-onboard config will define the
       * optional chains for the WalletConnect module
       */
      requiredChains?: number[] | undefined
      /**
       * \`undefined\` by default, see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
       */
      qrModalOptions?: EthereumProviderOptions['qrModalOptions']
    }
)</xmp>
`

public readonly customUsage: string = `import {walletConnectModule, Init } from "@b-ee/web3-connect";

const wcV1InitOptions = {
  bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'argent', 'trust']
  },
  connectFirstChainId: true
}

const wcV2InitOptions = {
  version: 2,
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri: (uri) => console.log(uri),
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 56]
}

// initialize the module with options
// If version isn't set it will default to V1 until V1 sunset
const walletConnect = walletConnectModule(wcV2InitOptions || wcV1InitOptions)

// can also initialize with no options...
// Defaults to V1 until V1 sunset
// const walletConnect = walletConnectModule()

const web3Connect = Init({
  // ... other Web3Connect options
  wallets: [
    walletConnect
    //... other wallets
  ]
})

const connectedWallets = await web3Connect.connectWallet()
console.log(connectedWallets)
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



