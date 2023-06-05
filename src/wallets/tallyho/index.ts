import {WalletInit, createEIP1193Provider } from '../../common'
import { CustomWindow } from './types'
import detectEthereumProvider from 'tallyho-detect-provider'
import TallyHoOnboarding from 'tallyho-onboarding'
declare const window: CustomWindow

export function tallyHoModule(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Taho',
      injectedNamespace: 'tally',
      checkProviderIdentity: ({ provider }: { provider: any }) => {
        !!provider && !!provider['isTally']
      },
      getIcon: async () => (await import('./icon')).default,
      getInterface: async () => {
        const provider = await detectEthereumProvider({ mustBeTallyHo: true })
        if (!provider) {
          const onboarding = new TallyHoOnboarding()
          onboarding.startOnboarding()
          throw new Error('Please install Taho to use this wallet')
        } else {
          return { provider: createEIP1193Provider(window.tally) }
        }
      },
      platforms: ['desktop']
    }
  }
}
