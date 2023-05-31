/**
 * TIPS：DEMO
 */
import { Component } from '@angular/core';
import {
  coinbaseModule,
  CustomNotification,
  disconnect,
  Init,
  injectedModule, Theme,
  trustModule,
  walletConnectModule,
  WalletState
} from "@b-ee/web3-connect";
import {defaultTestAppIcon} from "./b-ee-icon";
import {Observable, share} from "rxjs";
import {SiteTheme} from "../../app.service";
import {ethers} from "ethers";
import {AccountCenterPosition} from "../../../../../src/core/src/types";
import {updateAccountCenter} from "../../../../../src/core/src/store/actions";


export const appIcon = defaultTestAppIcon;
@Component({
  selector: 'add-demo',
  templateUrl: './demo.component.html',
  preserveWhitespaces: false
})
export class DEMOComponent {



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
      autoConnectLastWallet: true,
      autoConnectAllPreviousWallet: true
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
      icon: appIcon,
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
        transactionHandler: transaction => {
          console.log('transactionHandler', transaction)
          if (transaction.eventCode === 'txConfirmed') {
            return {
              autoDismiss: 0
            }
          }
          if (transaction.eventCode === 'txPool') {
            return {
              type: 'hint',
              message: 'Your in the pool, hope you brought a towel!',
              autoDismiss: 0,
              link: `https://goerli.etherscan.io/tx/${transaction.hash}`
            }
          }
        },
      }
    },
    // 'default'	default theme
    // 'dark'	dark mode
    // 'light'	light mode
    // 'system'	automatically switch between 'dark' & 'light' based on the user's system settings
    theme: 'dark'
  })

  public isLoading: boolean = false;

  public wallets$: Observable<any> = this.web3Connect.state.select('wallets').pipe(share());


  public wallet: WalletState;


  public appThemeValue: Theme = 'dark';
  public appPositionValue: AccountCenterPosition = 'topRight';
  constructor() {
  }

  async ngOnInit() {
    // updateAccountCenter({ position: "topLeft" })
    this.wallets$.subscribe(wallets => {
      this.wallet = wallets[0];
    })

    // this.beeWeb3Connect.state.actions.updateTheme('light')
  }

  async connect(): Promise<void> {
    this.isLoading = true;
    await this.web3Connect.connectWallet();
    this.isLoading = false;
  }

  public disconnectAllWallets(): void {
    this.wallets.forEach(({ label }) => disconnect({ label }))
    this.wallets = [];
  }

  public updateTheme = (selectedTheme: Theme) => {
    console.log('selectedTheme', selectedTheme)
    this.web3Connect.state.actions.updateTheme(selectedTheme);
  }
  public updatePosition = (position: AccountCenterPosition) => {
    console.log('position', position)
    this.web3Connect.state.actions.updateAccountCenter({ position: position });
  }


  pendingNotification(type) {
    if(type === 'success') {
      const { update, dismiss } =
        this.web3Connect.state.actions.customNotification({
          type: 'pending',
          message:
            'This is a custom DApp pending notification to use however you want',
          autoDismiss: 0
        })
      setTimeout(
        () =>
          update({
            eventCode: 'dbUpdateSuccess',
            message: 'Updated status for custom notification',
            type: 'success',
            autoDismiss: 0
          }),
        4000
      )
    } else {
      const customNotification: CustomNotification = {
        message:
          'This is a custom DApp success notification to use however you want',
        autoDismiss: 0,
        type: type
      }
      this.web3Connect.state.actions.customNotification(customNotification)
    }

  }

  dAppNotification() {
    const customNotification: CustomNotification = {
      message:
        'This is a custom DApp success notification to use however you want',
      autoDismiss: 0,

      onClick:() => console.log('event'),
    }
    this.web3Connect.state.actions.customNotification(customNotification)

  }


  testNotification() {
    const customNotification: CustomNotification = {
      message:
        'This is a custom DApp success notification to use however you want',
      autoDismiss: 0,
      onClick:() => console.log('event'),
    }
    this.web3Connect.state.actions.customNotification(customNotification)

  }

  async setChain(data) {
    await this.web3Connect.setChain(data);
  }

  sendTransactionWithPreFlight = async () => {
    await this.web3Connect.setChain({ chainId: '0x38' })

    // const balanceValue = Object.values(balance)[0]
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(this.wallet.provider, 'any')

    const signer = ethersProvider.getSigner()
    const txDetails = {
      to: '0x2f548c7dB757fa6dC60d16c7416b0fE6523345Ae',
      value: 100000000000000
    }

    const sendTransaction = () => {
      return signer.sendTransaction(txDetails).then(tx => tx.hash)
    }

    const gasPrice = () =>
      ethersProvider.getGasPrice().then(res => res.toString())

    const estimateGas = () => {
      return ethersProvider.estimateGas(txDetails).then(res => res.toString())
    }
    const transactionHash = await this.web3Connect.state.actions.preflightNotifications({
      sendTransaction,
      gasPrice,
      estimateGas,
      balance: '0.0000001',
      txDetails: txDetails
    })

    if(transactionHash){
      const customNotification: CustomNotification = {
        message:
          `This is a custom DApp success notification hover to see link`,
        autoDismiss: 0,
        type: 'success',
        link: `https://bscscan.com/tx/${transactionHash}`,
      }
      this.web3Connect.state.actions.customNotification(customNotification)
    }


  }

}
