import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HighlightService} from "../../../../share/services/highlight.service";
@Component({
  selector: 'app-injected',
  templateUrl: './injected.component.html',
  preserveWhitespaces: false
})
export class InjectedComponent implements AfterViewChecked {

public readonly exampleInit: string = `import {injectedModule, Init } from "@b-ee/web3-connect";

const injected = injectedModule();
`;

public readonly quickstart: string = `import {injectedModule, Init } from "@b-ee/web3-connect";

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule();

const web3Connect = Init({
  wallets: [
    //... other wallets
    injected
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    description: 'My app using Web3-Connect'
  }
  // ... other Web3Connect options
})

async connect() {
  const connectedWallets = await web3Connect.connectWallet();
  console.log(connectedWallets);
}
`;

public readonly filteringWallets: string = `import {injectedModule, ProviderLabel, Init } from "@b-ee/web3-connect";

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule({
  filter: {
    [ProviderLabel.Detected]: false
  }
})

const web3Connect = Init({
  wallets: [injected]
  // ... other Web3Connect options
})

async connect() {
  const connectedWallets = await web3Connect.connectWallet();
  console.log(connectedWallets);
}
`;

public readonly filteringWalletsDetected: string = `import {injectedModule, ProviderLabel, Init } from "@b-ee/web3-connect";

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule({
  filter: {
    // allow only on non android mobile
    [ProviderLabel.Detected]: ['Android', 'desktop']
  }
})
const web3Connect = Init({
  wallets: [injected]
  // ... other Web3Connect options
})

async connect() {
  const connectedWallets = await web3Connect.connectWallet();
  console.log(connectedWallets);
}
`;

public readonly platforms: string = `type Platform =
  | 'Windows Phone'
  | 'Windows'
  | 'macOS'
  | 'iOS'
  | 'Android'
  | 'Linux'
  | 'Chrome OS'
  | 'Android Browser'
  | 'Chrome'
  | 'Chromium'
  | 'Firefox'
  | 'Microsoft Edge'
  | 'Opera'
  | 'Safari'
  | 'desktop'
  | 'mobile'
  | 'tablet'
`;

public readonly custom: string = `const equal = {
  // The label that will be displayed in the wallet selection modal
  label: 'Equal',
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: 'ethereum',
  // A function that returns a bool indicating whether or not the provider is
  // of a certain identity. In this case, a unique property on the provider
  // is used to identify the provider.
  // In most cases this is in the format: is<provider-name>.
  // You may also include custom logic here if checking for the property
  // isn't sufficient.
  checkProviderIdentity: ({ provider }) => !!provider && !!provider[ProviderIdentityFlag.MetaMask],

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('<PATH_TO_ICON>')).default,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: () => ({
    provider: window.ethereum
  }),
  // A list of platforms that this wallet supports
  platforms: ['desktop'],
  /**
   * A Url to link users to a download page for the wallet
   * to be shown if not installed or available on the browser
   */
  externalUrl: 'http://www.CoolEqualWalletDownload.com'
}

const injected = injectedModule({
  custom: [equal]
})

const web3Connect = Init({
  wallets: [injected]
  // ... other Web3Connect options
})
async connect() {
  const connectedWallets = await web3Connect.connectWallet();
  console.log(connectedWallets);
}
`;
public readonly displayUnavailable: string = `const injected = injectedModule({
  // display all unavailable injected wallets
  displayUnavailable: true,
  ||
  // display specific unavailable wallets
  displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust]
})
`;

public readonly displayUnavailableSort: string = `const injected = injectedModule({
  // display specific injected wallets even if they are unavailable
  // can also be set to \`true\` to display all unavailable injected wallets
  displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust],
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: (wallets) => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)
    const coinbase = wallets.find(({ label }) => label === ProviderLabel.Coinbase)

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) => label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter((wallet) => wallet)
    )
  }
})
`;

public readonly displayUnavailableSortOne: string = `const injected = injectedModule({
  // display specific injected wallets even if they are unavailable
  // can also be set to \`true\` to display all unavailable injected wallets
  displayUnavailable: true,
  // but only show Binance and Bitski wallet if they are available
  filter: {
    [ProviderLabel.Binance]: 'unavailable',
    [ProviderLabel.Bitski]: 'unavailable'
  },
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: (wallets) => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)
    const coinbase = wallets.find(({ label }) => label === ProviderLabel.Coinbase)

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) => label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter((wallet) => wallet)
    )
  }
})
`;


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



