import {Component} from '@angular/core';
import {coinbaseModule, Init, injectedModule, trustModule, walletConnectModule, WalletState} from "@b-ee/web3-connect";
import disconnect from "../../../../../src/core/src/disconnect";

@Component({
  selector: 'app-connect-btn',
  templateUrl: './connect-btn.component.html',
  styleUrls: ['./connect-btn.component.scss']
})
export class ConnectBtnComponent {
  private injected = injectedModule();
  private trust = trustModule();
  private walletConnect = walletConnectModule({
    // connectFirstChainId: true,
    version: 1,
    // projectId: '82e1205a3a78d51b7c289cd068121f4b',
    // qrcodeModalOptions: {
    //   mobileLinks: [
    //     'rainbow',
    //     'metamask',
    //     'argent',
    //     'trust',
    //     'imtoken',
    //     'pillar'
    //   ]
    // }
  });
  private coinbase = coinbaseModule();
  public wallets: WalletState[] = [];

  private web3Connect = Init({
    locale: 'en',
    wallets: [
      this.injected,
      this.trust,
      this.walletConnect,
      this.coinbase,
    ],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum',
        rpcUrl: `https://mainnet.infura.io/v3/eb6704a4ab16437ea16afafb91ec8337`
      },
      {
        id: '0x5',
        token: 'ETH',
        label: 'Goerli',
        rpcUrl: `https://goerli.infura.io/v3/eb6704a4ab16437ea16afafb91ec8337`
      },
      {
        id: 11155111,
        token: 'ETH',
        label: 'Sepolia',
        rpcUrl: 'https://rpc.sepolia.org/'
      },
      {
        id: '0x13881',
        token: 'MATIC',
        label: 'Polygon - Mumbai',
        rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
      },
      {
        id: '0x38',
        token: 'BNB',
        label: 'Binance',
        rpcUrl: 'https://bsc-dataseed.binance.org/'
      },
      {
        id: '0x89',
        token: 'MATIC',
        label: 'Polygon',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
      },
      {
        id: '0xfa',
        token: 'FTM',
        label: 'Fantom',
        rpcUrl: 'https://rpc.ftm.tools/'
      },
      {
        id: '0xA',
        token: 'OETH',
        label: 'Optimism',
        rpcUrl: 'https://mainnet.optimism.io'
      },
      {
        id: '0xA4B1',
        token: 'ARB-ETH',
        label: 'Arbitrum',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      },
      {
        id: 84531,
        token: 'ETH',
        label: 'Base Goerli',
        rpcUrl: 'https://goerli.base.org'
      }
    ],
    connect: {
      // disableClose: true,
      autoConnectLastWallet: false,
      autoConnectAllPreviousWallet: false
    },

    // | 'topRight'
    // | 'topLeft'
    // | 'bottomRight'
    // | 'bottomLeft'
    accountCenter: {
      desktop: {
        position: 'topRight',
        enabled: true,
        showTokenList: true
      }
    },
    appMetadata: {
      name: 'B-EE Web3 Connect',
      description: 'Demo app for B-EE Web3 Connect V1',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ],
      agreement: {
        version: '1.0.0',
        termsUrl: 'https://www.b-ee.io',
        privacyUrl: 'https://www.b-ee.io'
      },
      gettingStartedGuide: 'https://b-ee.io',
      explore: 'https://b-ee.io'
    },

    // example customizing copy
    notify: {
      desktop: {
        enabled: true,
        transactionHandler: (transaction: any) => { if (transaction.eventCode === 'txConfirmed') {
          return {
            autoDismiss: 0
          }
        }}
      }
    },
    // 'default'	default theme
    // 'dark'	dark mode
    // 'light'	light mode
    // 'system'	automatically switch between 'dark' & 'light' based on the user's system settings
    theme: 'dark'
  })

  public isLoading

  constructor() {
  }
  async connect(): Promise<void> {
    this.isLoading = true;
    this.wallets = await this.web3Connect.connectWallet();
    this.isLoading = false;
  }

  public disconnectAllWallets(): void {
    this.wallets.forEach(({ label }) => disconnect({ label }))
    this.wallets = [];
  }

}
