import connectWallet from './connect'
import disconnectWallet from './disconnect'
import setChain from './chain'
import type { ConnectModalOptions, InitOptions, Notify, Theme } from './types'
import { APP_INITIAL_STATE, STORAGE_KEYS } from './constants'
import { configuration, updateConfiguration } from './configuration'
import updateBalances from './update-balances'
import { chainIdToHex, getLocalStore, setLocalStore } from './utils'
import { preflightNotifications } from './preflight-notifications'

import {
  validateInitOptions,
  validateNotify,
  validateNotifyOptions
} from './validation'

import {
  addChains,
  updateAccountCenter,
  updateNotify,
  customNotification,
  setLocale,
  setPrimaryWallet,
  setWalletModules,
  updateConnectModal,
  updateTheme
} from './store/actions'
import {beeWeb3ConnectLocales} from "./locales";
import {state} from "./store";

const API = {
  connectWallet,
  disconnectWallet,
  setChain,
  state: {
    get: state.get,
    select: state.select,
    actions: {
      setWalletModules,
      setLocale,
      updateNotify,
      customNotification,
      preflightNotifications,
      updateBalances,
      updateAccountCenter,
      setPrimaryWallet,
      updateTheme
    }
  }
}

export type BeeWeb3ConnectAPI = typeof API

export type {
  InitOptions,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain,
  AccountCenter,
  AppState,
  CustomNotification,
  Notification,
  Notify,
  UpdateNotification,
  PreflightNotificationsOptions,
  Theme
} from './types'

export type { EIP1193Provider } from '../../common'

export function Init(options: InitOptions): BeeWeb3ConnectAPI {
  if (typeof window === 'undefined') return API

  if (options) {
    const error = validateInitOptions(options)

    if (error) {
      throw error
    }
  }

  const {
    wallets,
    chains,
    appMetadata = null,
    locale ,
    accountCenter,
    apiKey,
    notify,
    gas,
    connect,
    // transactionPreview,
    theme,
    disableFontDownload,
    // unstoppableResolution
  } = options




  const { device } = configuration

  addChains(chainIdToHex(chains))

  if (typeof connect !== undefined) {
    updateConnectModal(connect)
  }

  // update locale
  if (typeof locale !== 'undefined' && Object.keys(beeWeb3ConnectLocales).includes(locale)) {
    setLocale(locale);
  } else {
    setLocale('en');
  }

  // update accountCenter
  if (typeof accountCenter !== 'undefined') {
    let accountCenterUpdate

    if (device.type === 'mobile') {
      accountCenterUpdate = {
        ...APP_INITIAL_STATE.accountCenter,
        ...(accountCenter.mobile ? accountCenter.mobile : {})
      }
    } else if (accountCenter.desktop) {
      accountCenterUpdate = {
        ...APP_INITIAL_STATE.accountCenter,
        ...accountCenter.desktop
      }
    }
    updateAccountCenter(accountCenterUpdate)
  }

  // update notify
  if (typeof notify !== 'undefined') {
    if ('desktop' in notify || 'mobile' in notify) {
      const error = validateNotifyOptions(notify)

      if (error) {
        throw error
      }

      let notifyUpdate: Partial<Notify>

      if (device.type === 'mobile' && notify.mobile) {
        notifyUpdate = {
          ...APP_INITIAL_STATE.notify,
          ...notify.mobile
        }
      } else if (notify.desktop) {
        notifyUpdate = {
          ...APP_INITIAL_STATE.notify,
          ...notify.desktop
        }
      }

      updateNotify(notifyUpdate)
    } else {
      const error = validateNotify(notify as Notify)

      if (error) {
        throw error
      }

      const notifyUpdate: Partial<Notify> = {
        ...APP_INITIAL_STATE.notify,
        ...notify
      }

      updateNotify(notifyUpdate)
    }
  } else {
    const notifyUpdate: Partial<Notify> = APP_INITIAL_STATE.notify

    updateNotify(notifyUpdate)
  }

  updateConfiguration({
    appMetadata,
    apiKey,
    initialWalletInit: wallets,
    gas
  })



  theme && updateTheme(theme)

  // handle auto connection of last wallet
  if (
    connect &&
    (connect.autoConnectLastWallet || connect.autoConnectAllPreviousWallet)
  ) {
    const lastConnectedWallets = getLocalStore(
      STORAGE_KEYS.LAST_CONNECTED_WALLET
    )
    try {
      const lastConnectedWalletsParsed = JSON.parse(lastConnectedWallets)
      if (
        lastConnectedWalletsParsed &&
        Array.isArray(lastConnectedWalletsParsed) &&
        lastConnectedWalletsParsed.length
      ) {
        connectAllPreviousWallets(lastConnectedWalletsParsed, connect)
      }
    } catch (err) {
      // Handle for legacy single wallet approach
      // Above try will throw syntax error is local storage is not json
      if (err instanceof SyntaxError && lastConnectedWallets) {
        API.connectWallet({
          autoSelect: {
            label: lastConnectedWallets,
            disableModals: true
          }
        })
      }
    }
  }

  return API
}


const connectAllPreviousWallets = async (
  lastConnectedWallets: Array<string>,
  connect: ConnectModalOptions
): Promise<void> => {
  const activeWalletsList = []
  const parsedWalletList = lastConnectedWallets

  if (!connect.autoConnectAllPreviousWallet) {
    API.connectWallet({
      autoSelect: { label: parsedWalletList[0], disableModals: true }
    })
    activeWalletsList.push(parsedWalletList[0])
  } else {
    // Loop in reverse to maintain wallet order
    for (let i = parsedWalletList.length; i--; ) {
      const walletConnectionPromise = await API.connectWallet({
        autoSelect: { label: parsedWalletList[i], disableModals: true }
      })
      // Update localStorage list for available wallets
      if (walletConnectionPromise.some(r => r.label === parsedWalletList[i])) {
        activeWalletsList.unshift(parsedWalletList[i])
      }
    }
  }
  setLocalStore(
    STORAGE_KEYS.LAST_CONNECTED_WALLET,
    JSON.stringify(activeWalletsList)
  )
}


