import type { WalletInit, EIP1193Provider } from '../../common'
import { openInfinityWallet } from '@infinitywallet/infinity-connector'
import { CustomWindow } from './types'
declare const window: CustomWindow

interface InfinityWalletOptions {
  chainId?: number
}

export function infinityWalletModule(options?: InfinityWalletOptions): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Infinity Wallet',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum')

        let provider: EIP1193Provider

        // check if Infinity Wallet is injected into window.ethereum
        if (ethereumInjectionExists && window['ethereum'].isInfinityWallet) {
          provider = window['ethereum']
        } else {
          openInfinityWallet(window.location.href, options?.chainId)
          throw new Error(
            'Opening Infinity Wallet! If not installed first download to use Infinity Wallet'
          )
        }

        return {
          provider
        }
      }
    }
  }
}

