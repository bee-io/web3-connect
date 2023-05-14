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

