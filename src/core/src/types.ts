import type {
  AppMetadata,
  Device,
  WalletInit,
  EIP1193Provider,
  WalletModule,
  Chain,
  TokenSymbol,
  ChainWithDecimalId
} from '../../common'

import type gas from '../../gas'
import type unstoppableResolution from'../../wallets/unstoppable-resolution'

import type { EthereumTransactionData, Network } from 'bnc-sdk'

export interface InitOptions {
  /**
   * Wallet modules to be initialized and added to wallet selection modal
   */
  wallets: WalletInit[]
  /**
   * The chains that your app works with
   */
  chains: (Chain | ChainWithDecimalId)[]
  /**
   * Additional metadata about your app to be displayed in the BeeWeb3Connect UI
   */
  appMetadata?: AppMetadata
  /**
   * Define custom copy for the 'en' locale
   */
  locale?: Locale
  /**
   * Customize the connect modal
   */
  connect?: ConnectModalOptions
  /**
   * Customize the account center UI
   */
  accountCenter?: AccountCenterOptions
  /**
   * Opt in to Blocknative value add services (transaction updates) by providing
   * your Blocknative API key, head to https://explorer.blocknative.com/account
   */
  apiKey?: string
  /**
   * Transaction notification options
   */
  notify?: Partial<NotifyOptions> | Partial<Notify>
  /** Gas module */
  gas?: typeof gas
  /**
   * Object mapping for W3O components with the key being the DOM
   * element to mount the component to, this defines the DOM container
   *  element for svelte to attach the component
   */
  containerElements?: Partial<ContainerElements>
  /**
   * Transaction Preview module
   */
  /**
   * Custom or predefined theme for Web3BeeWeb3Connect
   * BuiltInThemes: ['default', 'dark', 'light', 'system']
   * or customize with a ThemingMap object.
   */
  theme?: Theme
  /**
   * Defaults to False - use to reduce load time
   * If set to true the Inter font will not be imported and
   * instead the default 'sans-serif' font will be used
   * To define the font used see `--be-e-font-family` prop within
   * the Theme initialization object or set as css variable
   */
  disableFontDownload?: boolean
  unstoppableResolution?: typeof unstoppableResolution
}

export type Theme = ThemingMap | BuiltInThemes | 'system'

export type BuiltInThemes = 'dark' | 'light'

export type Locale = 'en' |'ua'

export type ThemingMap = {
  '--b-ee-background-color'?: string
  '--b-ee-font-family'?: string
  '--b-ee-foreground-color'?: string
  '--b-ee-text-color'?: string
  '--b-ee-border-color'?: string
  '--b-ee-action-color'?: string
  '--b-ee-border-radius'?: string
}
export interface ConnectOptions {
  autoSelect?: { label: string; disableModals: boolean }
}

export interface ConnectOptionsString {
  autoSelect?: string
}

export interface DisconnectOptions {
  label: string // wallet name to disconnect
}

export interface WalletWithLoadedIcon extends Omit<WalletModule, 'getIcon'> {
  icon: string
}

export interface WalletWithLoadingIcon
  extends Omit<WalletWithLoadedIcon, 'icon'> {
  icon: Promise<string>
}

export type ConnectedChain = {
  id: Chain['id']
  namespace: Chain['namespace']
}

export interface ConnectWalletState {
  autoSelect?: ConnectOptions['autoSelect']
  actionRequired?: string
  inProgress: boolean
}

export interface WalletState {
  label: string //  wallet name
  icon: string // wallet icon svg string
  provider: EIP1193Provider
  accounts: Account[]
  // in future it will be possible that a wallet
  // is connected to multiple chains at once
  chains: ConnectedChain[]
  instance?: unknown
}

export interface SecondaryTokenBalances {
  name: TokenSymbol
  balance: string
  icon?: string
}

export type Account = {
  address: Address
  ens?: Ens | null
  uns?: Uns | null
  balance: Balances | null
  secondaryTokens?: SecondaryTokenBalances[] | null
}

export type Balances = Record<TokenSymbol, string> | null

export interface Ens {
  name: string
  avatar: Avatar | null
  contentHash: string | null
  getText: (key: string) => Promise<string | undefined>
}

export interface Uns {
  name: string
}

export type Avatar = {
  url: string
  linkage: Array<{ type: string; content: string }>
}

export type Address = string

export interface AppState {
  chains: Chain[]
  walletModules: WalletModule[]
  wallets: WalletState[]
  accountCenter: AccountCenter
  locale: string
  notify: Notify
  notifications: Notification[]
  connect: ConnectModalOptions
}

export type Configuration = {
  device: Device | DeviceNotBrowser
  initialWalletInit: WalletInit[]
  appMetadata?: AppMetadata | null
  apiKey?: string
  gas?: typeof gas,
  unstoppableResolution?: typeof unstoppableResolution
}

export type ConnectModalOptions = {
  /**
   * If set to true, the most recently connected wallet will store in
   * local storage. Then on init, BeeWeb3Connect will try to reconnect to
   * that wallet with no modals displayed
   */
  autoConnectLastWallet?: boolean
  /**
   * If set to true, all previously connected wallets will store in
   * local storage. Then on init, BeeWeb3Connect will try to reconnect to
   * each wallet with no modals displayed
   */
  autoConnectAllPreviousWallet?: boolean
  /**
   * Customize the link for the `I don't have a wallet` flow shown on the
   * select wallet modal.
   * Defaults to `https://ethereum.org/en/wallets/find-wallet/#main-content`
   */
  iDontHaveAWalletLink?: string
  /**
   * Customize the link for the `Where's My Wallet` info pop up shown on the
   * select wallet modal.
   * Defaults to `https://www.blocknative.com/blog/
   * metamask-wont-connect-web3-wallet-troubleshooting`
   */
  wheresMyWalletLink?: string
  /**
   * @deprecated Has no effect unless `@web3-BeeWeb3Connect/unstoppable-resolution`
   * package has been added and passed into the web3-BeeWeb3Connect initialization
   * In this case remove the `@web3-BeeWeb3Connect/unstoppable-resolution` package
   * to remove unstoppableDomain resolution support
   */
  disableUDResolution?: boolean
}

export type CommonPositions =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

export type AccountCenterPosition = CommonPositions

export type NotificationPosition = CommonPositions

export type AccountCenter = {
  enabled: boolean
  position?: AccountCenterPosition
  expanded?: boolean
  showTokenList?: boolean
}

export type AccountCenterOptions = {
  desktop: Omit<AccountCenter, 'expanded'>
  mobile?: Omit<AccountCenter, 'expanded'>
}

export type ContainerElements = {
  /** When attaching the Connect Modal to a container el be aware that
   * the modal was styled to be mounted through the app to the html body
   * and will respond to screen width rather than container width
   * This is specifically apparent on mobile so please test thoroughly
   * Also consider that other DOM elements(specifically Notifications and
   * Account Center) will also append to this DOM el if enabled and their
   * own containerEl are not defined
   */
  connectModal?: string
  /** when using the accountCenter with a container el the accountCenter
   * position properties are ignored
   */
  accountCenter?: string
}

export type Notify = {
  /**
   * Defines whether whether to subscribe to transaction events or not
   * default: true
   */
  enabled: boolean
  /**
   * Callback that receives all transaction events
   * Return a custom notification based on the event
   * Or return false to disable notification for this event
   * Or return undefined for a default notification
   */
  transactionHandler: (
    event: EthereumTransactionData
  ) => TransactionHandlerReturn
}

export type NotifyOptions = {
  desktop: Notify
  mobile: Notify
}

export type Notification = {
  id: string
  key: string
  network: Network
  startTime?: number
  /**
   * to completely customize the message shown
   */
  message: string
  /**
   * handle codes in your own way - see codes here under the notify
   * prop default en file at ./packages/core/src/i18n/en.json
   */
  eventCode: string
  /**
   * icon type displayed (see `NotificationType` below for options)
   */
  type: NotificationType
  /**
   * time (in ms) after which the notification will be dismissed. If set
   * to `0` the notification will remain on screen until the user dismisses the
   * notification, refreshes the page or navigates away from the site
   * with the notifications
   */
  autoDismiss: number
  /**
   * add link to the transaction hash. For instance, a link to the
   * transaction on etherscan
   */
  link?: string
  /**
   * onClick handler for when user clicks the notification element
   */
  onClick?: (event: Event) => void
}

export type TransactionHandlerReturn = CustomNotification | boolean | void

export type CustomNotification = Partial<
  Omit<Notification, 'startTime' | 'network' | 'id' | 'key'>
>

export type CustomNotificationUpdate = Partial<
  Omit<Notification, 'startTime' | 'network'>
>

export type NotificationType = 'pending' | 'success' | 'error' | 'hint'

export interface UpdateNotification {
  (notificationObject: CustomNotification): {
    dismiss: () => void
    update: UpdateNotification
  }
}

export interface PreflightNotificationsOptions {
  sendTransaction?: () => Promise<string | void>
  estimateGas?: () => Promise<string>
  gasPrice?: () => Promise<string>
  balance?: string | number
  txDetails?: TxDetails
  txApproveReminderTimeout?: number
}

export interface TxDetails {
  value: string | number
  to?: string
  from?: string
}

// ==== ACTIONS ==== //
export type Action =
  | AddChainsAction
  | UpdateChainsAction
  | AddWalletAction
  | UpdateWalletAction
  | RemoveWalletAction
  | ResetStoreAction
  | UpdateAccountAction
  | UpdateAccountCenterAction
  | SetWalletModulesAction
  | SetLocaleAction
  | UpdateNotifyAction
  | AddNotificationAction
  | RemoveNotificationAction
  | UpdateAllWalletsAction
  | UpdateConnectModalAction

export type AddChainsAction = { type: 'add_chains'; payload: Chain[] }
export type UpdateChainsAction = { type: 'update_chains'; payload: Chain }
export type AddWalletAction = { type: 'add_wallet'; payload: WalletState }

export type UpdateWalletAction = {
  type: 'update_wallet'
  payload: { id: string } & Partial<WalletState>
}

export type RemoveWalletAction = {
  type: 'remove_wallet'
  payload: { id: string }
}

export type ResetStoreAction = {
  type: 'reset_store'
  payload: unknown
}

export type UpdateAccountAction = {
  type: 'update_account'
  payload: { id: string; address: string } & Partial<Account>
}

export type UpdateAccountCenterAction = {
  type: 'update_account_center'
  payload: AccountCenter | Partial<AccountCenter>
}

export type UpdateConnectModalAction = {
  type: 'update_connect_modal'
  payload: Partial<ConnectModalOptions>
}

export type SetWalletModulesAction = {
  type: 'set_wallet_modules'
  payload: WalletModule[]
}

export type SetLocaleAction = {
  type: 'set_locale'
  payload: string
}

export type UpdateNotifyAction = {
  type: 'update_notify'
  payload: Partial<Notify>
}

export type AddNotificationAction = {
  type: 'add_notification'
  payload: Notification
}

export type RemoveNotificationAction = {
  type: 'remove_notification'
  payload: Notification['id']
}

export type UpdateAllWalletsAction = {
  type: 'update_balance'
  payload: WalletState[]
}

// ==== MISC ==== //
export type ChainStyle = {
  icon: string
  color: string
}

export type NotifyEventStyles = {
  backgroundColor: string
  borderColor: string
  eventIcon: string
  iconColor?: string
}

export type DeviceNotBrowser = {
  type: null
  os: null
  browser: null
}

export type WalletPermission = {
  id: string
  parentCapability: string
  invoker: string
  caveats: {
    type: string
    value: string[]
  }[]

  date: number
}


// Balances Models

export class SettingsModel {
  public balancesContract: string;
  public bscRpc: string;
  public defaultConfig:  NetworkModel[];
  public digitsPrice: string;
  public enableTotalByAllTokens: string;
  public ethRpc: string;
  public polygonRpc: string;
  constructor(value: SettingsModel) {
    Object.assign(this, value);
    if (value != null) {
      this.defaultConfig = value.defaultConfig.map((item) => new NetworkModel(item));
    }
  }
}
export class TokenModel {
  public address: string;
  public balance: string;
  public decimals:number;
  public isActive:boolean;
  public name: string;
  public price: string;
  public rateToUSD:number;
  public symbol: string;
  constructor(value: TokenModel) {
    Object.assign(this, value);
  }
}
export class NetworkModel {
  public balancesContract: string;
  public chainId: string;
  public name: string;
  public rpc: string;
  public scanUrl: string;
  public tokens: {
    excluded: TokenModel[];
    included: TokenModel[];
  };
  public totalBalance: string;
  constructor(value: NetworkModel) {
    Object.assign(this, value);
    if (value != null && value.tokens.included) {
      this.tokens.included = value.tokens.included.map((item) => new TokenModel(item));
    }
    if (value != null && value.tokens.excluded) {
      this.tokens.excluded = value.tokens.excluded.map((item) => new TokenModel(item));
    }
  }
}
export class WalletBalancesModel {
  public data: NetworkModel[];
  public totalBalance: string;
  public wallet: string;

  constructor(value: WalletBalancesModel) {
    Object.assign(this, value);
    if (value != null) {
      this.data = value.data.map((item) => new NetworkModel(item));
    }
  }
}
