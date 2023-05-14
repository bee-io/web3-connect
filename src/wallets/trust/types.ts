import { EIP1193Provider } from '../../common'
// @ts-ignore
export interface CustomWindow extends Window {
  ethereum: EIP1193Provider & {
    isTrust?: boolean;
  }
  trustwallet: EIP1193Provider
}
