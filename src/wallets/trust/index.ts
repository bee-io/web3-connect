import type { WalletInit, EIP1193Provider } from '../../common'
import { CustomWindow } from './types'
declare const window: CustomWindow

export function trustModule(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Trust Wallet',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum')

        let provider: EIP1193Provider

        // check if trust is injected into window.ethereum
        if (ethereumInjectionExists && window['ethereum'].isTrust) {
          provider = window['ethereum']
        } else if (window['trustwallet']) {
          // directly use the window.trustwallet injection
          provider = window['trustwallet']
        } else {
          // trustwallet extension is not installed
          // send user to install page
          window.open('https://trustwallet.com/browser-extension', '_blank')
          throw new Error('Please Install Trust to use this wallet')
        }

        return {
          provider
        }
      }
    }
  }
}
