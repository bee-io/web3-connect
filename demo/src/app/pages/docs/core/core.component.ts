import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../app.service";
import {HighlightService} from "../../../share/services/highlight.service";
import {Chain, WalletModule} from "../../../../../../src/common";
import {AccountCenter, ConnectModalOptions, Notification, Notify, WalletState} from "@b-ee/web3-connect";
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  preserveWhitespaces: false
})
export class CoreComponent implements AfterViewChecked {


public readonly importModuleHTML: string = `/** import Web3ConnectModule **/
import { Web3ConnectModule } from '@b-ee/web3-connect';

/** include Web3ConnectModule to imports **/
@NgModule({
  imports: [Web3ConnectModule]
})

export class AppModule { }
`;

public readonly configureWalletsHTML: string = `import {Init, injectedModule} from "@b-ee/web3-connect";

const injected = injectedModule()

const wallets = [injected]`;

public readonly chainsHTML: string = `type Chain = {
  id: ChainId // hex encoded string, eg '0x1' for Ethereum Mainnet
  namespace?: 'evm' // string indicating chain namespace. Defaults to 'evm' but will allow other chain namespaces in the future
  // PLEASE NOTE: Some wallets require an rpcUrl, label, and token for actions such as adding a new chain.
  // It is recommended to include rpcUrl, label, and token for full functionality.
  rpcUrl?: string // Recommended to include. Used for network requests.
  label?: string // Recommended to include. Used for display, eg Ethereum Mainnet.
  token?: TokenSymbol // Recommended to include. The native token symbol, eg ETH, BNB, MATIC.
  color?: string // the color used to represent the chain and will be used as a background for the icon
  icon?: string // the icon to represent the chain
  publicRpcUrl?: string // an optional public RPC used when adding a new chain config to the wallet
  blockExplorerUrl?: string // also used when adding a new config to the wallet
  secondaryTokens?: SecondaryTokens[] // An optional array of tokens (max of 5) to be available to the dapp in the app state object per wallet within the wallet account and displayed in Account Center (if enabled)
}

interface SecondaryTokens {
  /**
   * Required - The onchain address of the token associated
   * with the chain it is entered under
   */
  address: string
  /**
   * An optional svg or url string for the icon of the token.
   * If an svg is used ensure the height/width is set to 100%
   */
  icon?: string
}`;

  public readonly appMetadataHTML: string = `type AppMetadata = {
  // app name
  name: string
  // SVG icon string, with height or width (whichever is larger) set to 100% or a valid image URL
  // note: if using an emoji make sure to send base64 string
  // Note: \`icon\` is displayed on both mobile AND desktop. If \`logo\`
  // below is provided then \`icon\` displays on mobile and \`logo\` on desktop
  icon: string
  // Optional wide format logo (ie icon and text) to be displayed in the sidebar of connect modal. Defaults to icon if not provided
  // Note: This will ONLY display on desktop. It is best used with wide format logos. Use \`icon\` for standard 40x40 icons.
  logo?: string
  // description of app
  description?: string
  // url to a getting started guide for app
  gettingStartedGuide?: string
  // url that points to more information about app
  explore?: string
  // if your app only supports injected wallets and when no injected wallets detected, recommend the user to install some
  recommendedInjectedWallets?: RecommendedInjectedWallets[]
  // allows for dapps to require users to agree to TOS and privacy policy before connecting a wallet
  agreement?: TermsOfServiceAgreementOptions | null
}

type TermsOfServiceAgreementOptions = {
  // user agrees with exact version of terms and privacy policy
  version: string
  // url that points to the Terms & Conditions of the dapp
  termsUrl?: string
  // url that points to the Privacy policy of the dapp
  privacyUrl?: string
}

type RecommendedInjectedWallets = {
  name: string // display name
  url: string // link to download wallet
}
`;

  public readonly updateMetadataHTML: string = `this.web3Connect.state.actions.updateAppMetadata({
  logo: \`<svg width="100%" height="100%" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L0.0100002 6L4 10L0.0100002 14.01L0 20H12V14L8 10L12 6.01V0H0ZM10 14.5V18H2V14.5L6 10.5L10 14.5Z" fill="#929BED"/>
  </svg>\`,
  description: 'Updated Description!'
})
`;


  public readonly connectHTML: string = `type ConnectModalOptions = {
  autoConnectLastWallet?: boolean
  /**
   * If set to true, all previously connected wallets will store in
   * local storage. Then on init, onboard will try to reconnect to
   * each wallet with no modals displayed
   */
  autoConnectAllPreviousWallet?: boolean
  /**
   * Customize the link for the \`I don't have a wallet\` flow shown on the
   * select wallet modal.
   * Defaults to \`https://ethereum.org/en/wallets/find-wallet/#main-content\`
   */
  iDontHaveAWalletLink?: string
  /**
   * Customize the link for the \`Where's My Wallet\` info pop up shown on the
   * select wallet modal.
   * Defaults to \`https://www.blocknative.com/blog/metamask-wont-connect-web3-wallet-troubleshooting\`
   */
  wheresMyWalletLink?: string
}
`;

public readonly localeHTML: string = `type Locale = string // eg 'en', 'ua'

 public updateLanguage = (locale: Locale): void => {
  this.web3Connect.state.actions.updateAppMetadata.setLocale(locale);
 }
`;

public readonly themeHTML: string = `type Theme = ThemingMap | BuiltInThemes | 'system'

type BuiltInThemes = 'dark' | 'light'

type ThemingMap = {
  '--b-ee-background-color'?: string
  '--b-ee-foreground-color'?: string
  '--b-ee-text-color'?: string
  '--b-ee-border-color'?: string
  '--b-ee-action-color'?: string
  '--b-ee-border-radius'?: string
  '--b-ee-font-family'?: string
}
`;


  public readonly accountCenterHTML: string = `type AccountCenter = {
  enabled: boolean
  position?: AccountCenterPosition // default: 'topRight'
  expanded?: boolean // default: true
  showTokenList?: boolean // default: true
}
`;
  public readonly updateAccountCenterHTML: string = `this.web3Connect.state.actions.updateAccountCenter({
  position: 'topRight',
  enabled: true,
})
`;

  public readonly setPrimaryWalletHTML: string = `// set the second wallet in the wallets array as the primary
this.web3Connect.state.actions.setPrimaryWallet(wallets[1])

// set the second wallet in the wallets array as the primary wallet
// as well as setting the third account in that wallet as the primary account
this.web3Connect.state.actions.setPrimaryWallet(wallets[1], wallets[1].accounts[2].address)
`;

  public readonly setChainHTML: string = `<xmp>type SetChain = (options: SetChainOptions) => Promise<boolean>
type SetChainOptions = {
  chainId: string // hex encoded string
  chainNamespace?: 'evm' // defaults to 'evm' (currently the only valid value, but will add more in future updates)
  wallet?: string // the wallet.label of the wallet to set chain
  rpcUrl?: string // if chain was instantiated without rpcUrl, include here. Used for network requests
  token?: string // if chain was instantiated without token, include here. Used for display, eg Ethereum Mainnet
  label?: string // if chain was instantiated without label, include here. The native token symbol, eg ETH, BNB, MATIC
}

const success = await this.web3Connect.setChain({ chainId: '0x89' })
</xmp>`;


  public readonly handlingNotificationsHTML: string = `const wallets = this.web3Connect.state.select('notifications')
const { unsubscribe } = wallets.subscribe((update) =>
  console.log('transaction notifications: ', update)
)

// unsubscribe when updates are no longer needed
unsubscribe()
`;


  public readonly notificationsHTML: string = `<xmp>
type NotifyOptions = {
  desktop: Notify
}
type Notify = {
  enabled: boolean // default: true
  /**
   * Callback that receives all transaction events
   * Return a custom notification based on the event
   * Or return false to disable notification for this event
   * Or return undefined for a default notification
   */
  transactionHandler?: (event: EthereumTransactionData) => TransactionHandlerReturn
}

type TransactionHandlerReturn = CustomNotification | boolean | void

type Notification = {
  id: string
  key: string
  network: Network
  /**
   * to completely customize the message shown
   */
  message: string
  /**
   * handle codes in your own way - see codes here under the notify prop
   */
  eventCode: string
  /**
   * icon type displayed (see \`NotificationType\` below for options)
   */
  type: NotificationType
  /**
   * time (in ms) after which the notification will be dismissed. If set to \`0\` the notification will remain on screen until the user dismisses the notification, refreshes the page or navigates away from the site with the notifications
   */
  autoDismiss: number
  /**
   * add link to the transaction hash. For instance, a link to the transaction on etherscan
   */
  link?: string
  /**
   * onClick handler for when user clicks the notification element
   */
  onClick?: (event: Event) => void
}

type NotificationType = 'pending' | 'success' | 'error' | 'hint'

export declare type Network = 'main' | 'goerli' | 'matic-main' | 'matic-mumbai' | 'local'

export interface UpdateNotification {
  (notificationObject: CustomNotification): {
    dismiss: () => void
    update: UpdateNotification
  }
</xmp>`;

  public readonly InitializeHTML: string = `<xmp>@Component({
  selector: 'app-root',
  template: \`<web3-connect></web3-connect>
             <button (click)="connect()"></button>\`,
})

export class AppComponent {

  private web3Connect = Init({
    wallets
  });

  async connect() {
    const wallets = await this.web3Connect.connectWallet();
    console.log(wallets);
  }
}
</xmp>`

  public readonly initializationExample: string = `<xmp>import { Init, injectedModule } from '@b-ee/web3-connect';
const INFURA_ID = 'https://mainnet.infura.io/v3/INFURA_KEY';

@Component({
  selector: 'app-root',
  template: \`<web3-connect></web3-connect>
             <button (click)="connect()"></button>\`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  private injected = injectedModule();

  private web3Connect = Init({
    locale: 'en',
    theme: 'dark',
    wallets: [ this.injected ],
    chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: \`https://mainnet.infura.io/v3/INFURA_ID\`
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: \`https://goerli.infura.io/v3/INFURA_ID\`
    },
    {
      id: 11155111,
      token: 'ETH',
      label: 'Sepolia',
      rpcUrl: 'https://rpc.sepolia.org/'
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: 10,
      token: 'OETH',
      label: 'Optimism',
      rpcUrl: 'https://mainnet.optimism.io'
    },
    {
      id: 42161,
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
    accountCenter: {
      desktop: {
        position: 'topRight',
        enabled: true,
        showTokenList: true
      }
    },
    connect: {
      disableClose: true,
      autoConnectLastWallet: false,
      autoConnectAllPreviousWallet: false
    },
    appMetadata: {
      icon: myIcon, // svg string icon
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
  });

  async connect() {
    const wallets = await this.web3Connect.connectWallet();
    console.log(wallets);
  }
}
</xmp>
`;


  public readonly connectingWalletHTML: string = `async function connectWallet() {
  const wallets = await this.web3Connect.connectWallet()
  console.log(wallets)
}

connectWallet()
`;
  public readonly autoSelectWalletHTML: string = `const web3Connect = Init({
  // ... other options
  connect: {
    autoConnectLastWallet: true
  }
})
`;

  public readonly disconnectingWalletHTML: string = `// disconnect the first wallet in the wallets array
const [primaryWallet] = this.web3Connect.state.get().wallets
await this.web3Connect.disconnectWallet({ label: primaryWallet.label })
`;

  public readonly stateHTML: string = `<xmp>type AppState = {
  chains: Chain[]
  walletModules: WalletModule[]
  wallets: WalletState[]
  accountCenter: AccountCenter
  locale: string
  notify: Notify
  notifications: Notification[]
  connect: ConnectModalOptions
}

type Chain {
  namespace?: 'evm'
  id: ChainId
  rpcUrl: string
  label: string
  token: TokenSymbol
  color?: string
  icon?: string
}

type WalletState = {
  label: string
  icon: string
  provider: EIP1193Provider
  accounts: Account[]
  chains: ConnectedChain[]
  instance?: unknown
}

type Account = {
  address: string
  ens: {
    name?: string
    avatar?: string
    contentHash?: string
    getText?: (key: string) => Promise<string | undefined>
  }
  balance: Record<TokenSymbol, string>
}

type ConnectedChain = {
  namespace: 'evm'
  id: ChainId
}

type ChainId = string
type TokenSymbol = string

type AccountCenter = {
  enabled: boolean
  position: AccountCenterPosition
  expanded: boolean
}

type AccountCenterPosition =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

type WalletModule {
  label: string
  getIcon: () => Promise<string>
  getInterface: (helpers: GetInterfaceHelpers) => Promise<WalletInterface>
}
</xmp>`;

  public readonly getStateHTML: string = `const currentState = this.web3Connect.state.get()
`;
  public readonly subscribeStateHTML: string = `const state = this.web3Connect.state.select()
const { unsubscribe } = state.subscribe((update) => console.log('state update: ', update))

// remember to unsubscribe when updates are no longer needed
// unsubscribe()
`;
  public readonly specificSubscribeStateHTML: string = `const wallets = this.web3Connect.select('wallets')
const { unsubscribe } = wallets.subscribe((update) => console.log('wallets update: ', update))

// unsubscribe when updates are no longer needed
unsubscribe()
`;

  public readonly sendTransactionHTML: string = `const balanceValue = Object.values(balance)[0]
// if using ethers v6 this is:
// ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

const signer = ethersProvider.getSigner()
const txDetails = {
  to: toAddress,
  value: 100000000000000
}

const sendTransaction = () => {
  return signer.sendTransaction(txDetails).then((tx) => tx.hash)
}

const gasPrice = () => ethersProvider.getGasPrice().then((res) => res.toString())

const estimateGas = () => {
  return ethersProvider.estimateGas(txDetails).then((res) => res.toString())
}
const transactionHash = await this.web3Connect.state.actions.preflightNotifications({
  sendTransaction,
  gasPrice,
  estimateGas,
  balance: balanceValue,
  txDetails: txDetails
})
console.log(transactionHash)
`;

  public readonly sendTransactionInterfaceHTML: string = `interface PreflightNotificationsOptions {
  sendTransaction?: () => Promise<string | void>
  estimateGas?: () => Promise<string>
  gasPrice?: () => Promise<string>
  balance?: string | number
  txDetails?: {
    value: string | number
    to?: string
    from?: string
  }
  txApproveReminderTimeout?: number // defaults to 15 seconds if not specified
}
`;
  public readonly bufferHTML: string = `
(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
global.process = require('process');

`;


  private highlighted: boolean = false;

  constructor(public appService: AppService, private highlightService: HighlightService) {}


  public ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }

  goLink(link: string) {
    if (window) {
      window.location.hash = link;
    }
  }
}



