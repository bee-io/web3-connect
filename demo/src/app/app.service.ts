import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from "rxjs/operators";
import {
  coinbaseModule,
  Init,
  injectedModule,
  ledgerModule,
  trustModule,
  tallyHoModule,
  walletConnectModule,
  cedeStoreModule,
  ThemingMap,
  xdefiWalletModule,
  sequenceModule,
  fortmaticModule,
  portisModule,
  infinityWalletModule,
} from "@b-ee/web3-connect";
import {defaultTestAppIcon} from "./share/connect-btn/b-ee-icon";

export type SiteTheme =  'dark' | 'light';

export interface DemoCode {
  rawCode: string;
  highlightCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  codeMap = new Map<string, DemoCode>();

  language$ = new ReplaySubject<string>(1);
  theme$ = new ReplaySubject<SiteTheme>(1);

  public customTheme: ThemingMap = {
    '--b-ee-background-color': '#000',
    '--b-ee-foreground-color': '#242835',
    '--b-ee-text-color': '#EFF1FC',
    '--b-ee-border-color': '#33394B',
    '--b-ee-action-color': '#929bed',
    '--b-ee-border-radius': '16px',
    '--b-ee-font-family': 'inherit'
  }

  private injected = injectedModule();
  private cedeStore = cedeStoreModule();
  private trust = trustModule();
  private sequence = sequenceModule();
  private walletConnect =  walletConnectModule({
    connectFirstChainId: true,
    version: 2,
    projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
    qrcodeModalOptions: {
      mobileLinks: [
        'rainbow',
        'metamask',
        'argent',
        'trust',
        'imtoken',
        'pillar'
      ]
    },
    requiredChains:[1, 56]
  });
  private coinbase = coinbaseModule({ darkMode: true });
  private ledger = ledgerModule();
  private tallyho = tallyHoModule();
  private xdefi = xdefiWalletModule();
  private infinityWallet = infinityWalletModule();
  private fortmatic = fortmaticModule({
    apiKey: 'pk_test_886ADCAB855632AA'
  });
  private portis = portisModule({
    apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
  });
  public web3Connect = Init({
    locale: 'en',
    theme: 'dark',
    wallets: [
      this.injected,
      this.trust,
      this.walletConnect,
      this.coinbase,
      this.ledger,
      this.tallyho,
      this.cedeStore,
      this.xdefi,
      this.sequence,
      this.fortmatic,
      this.portis,
      this.infinityWallet,
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
      icon: defaultTestAppIcon,
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
        transactionHandler: (transaction: any) => { if (transaction.eventCode === 'txConfirmed') {
          return {
            autoDismiss: 0
          }
        }}
      }
    },

  })
  constructor(private http: HttpClient) {}

  getCode(componentId: string): Observable<DemoCode> {
    if (this.codeMap.has(componentId)) {
      return of(this.codeMap.get(componentId) as DemoCode);
    } else {
      const path = componentId.startsWith('components-') ? componentId.split('components-')[1] : componentId;
      return this.http.get<DemoCode>(`assets/codes/${path}.json`, {
        responseType: "json"
      })
      .pipe(tap(data => {
        this.codeMap.set(componentId, data);
      }))
    }
  }

}
