// import type { WalletInit } from '../../common'
// import type { Web3ModalConfig } from '@web3modal/standalone'
// import v1 from './v1'
// import v2 from './v2'
//
// export type WalletConnectOptions = {
//   /**
//    * Optional function to handle WalletConnect URI when it becomes available
//    */
//   handleUri?: (uri: string) => Promise<unknown>
//   connectFirstChainId?: boolean
//   bridge?: string
//   qrcodeModalOptions?: {
//     mobileLinks: string[]
//   }
// } & (
//   | {
//   /**
//    * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
//    */
//   version?: 1
// }
//   | {
//   /**
//    * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
//    */
//   projectId: string
//   /**
//    * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
//    */
//   version: 2
//   /**
//    * List of Required Chain(s) ID for wallets to support in number format (integer or hex)
//    * Defaults to [1] - Ethereum
//    * The chains defined within the web3-connect config will define the
//    * optional chains for the WalletConnect module
//    */
//   requiredChains?: number[] | undefined
//
//   /**
//    * `undefined` by default, see https://docs.walletconnect.com/2.0/web3modal/options
//    */
//   // @ts-ignore
//   qrModalOptions?: Pick<Web3ModalConfig, 'themeMode' | 'themeVariables' | 'chainImages' | 'desktopWallets' | 'enableExplorer' | 'explorerAllowList' | 'explorerDenyList' | 'mobileWallets' | 'privacyPolicyUrl' | 'termsOfServiceUrl' | 'tokenImages' | 'walletImages'>
// }
//   )
//
// export const isHexString = (value: string | number) => {
//   if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
//     return false
//   }
//
//   return true
// }
//
// export function walletConnectModule(options?: WalletConnectOptions): WalletInit {
//   const version = (options && options.version) || 1
//   return version === 1 ? v1(options) : v2(options)
// }
//
// // export default walletConnectModule

import type { WalletInit } from '../../common'
import v1 from './v1'

export type WalletConnectOptions = {
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
  connectFirstChainId?: boolean
  bridge?: string
  qrcodeModalOptions?: {
    mobileLinks: string[]
  }
} & (
  | {
  /**
   * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
   */
  version?: 1
}
  )

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

export function walletConnectModule(options?: WalletConnectOptions): WalletInit {
  return v1(options)
}

