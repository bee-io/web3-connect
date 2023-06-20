import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {CoinbaseComponent} from "./coinbase/coinbase.component";
import {FortmaticComponent} from "./fortmatic/fortmatic.component";
import {InfinityWalletComponent} from "./infinity-wallet/infinity-wallet.component";
import {WalletConnectComponent} from "./wallet-connect/wallet-connect.component";
import {LedgerComponent} from "./ledger/ledger.component";
import {TahoComponent} from "./taho/taho.component";
import {XdefiComponent} from "./xdefi/xdefi.component";
import {PortisComponent} from "./portis/portis.component";
import {SequenceComponent} from "./sequence/sequence.component";
import {TrustComponent} from "./trust/trust.component";
import {CodeStoreComponent} from "./code-store/code-store.component";
import {InjectedComponent} from "./injected/injected.component";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: 'injected', component: InjectedComponent},
            {path: 'coinbase', component: CoinbaseComponent},
            {path: 'fortmatic', component: FortmaticComponent},
            {path: 'infinity-wallet', component: InfinityWalletComponent},
            {path: 'wallet-connect', component: WalletConnectComponent},
            {path: 'ledger', component: LedgerComponent},
            {path: 'taho', component: TahoComponent},
            {path: 'xdefi', component: XdefiComponent},
            {path: 'portis', component: PortisComponent},
            {path: 'sequence', component: SequenceComponent},
            {path: 'trust', component: TrustComponent},
            {path: 'code-store', component: CodeStoreComponent},
        ]),
    ],
  declarations: [
    InjectedComponent,
    CoinbaseComponent,
    FortmaticComponent,
    InfinityWalletComponent,
    WalletConnectComponent,
    LedgerComponent,
    TahoComponent,
    XdefiComponent,
    PortisComponent,
    SequenceComponent,
    TrustComponent,
    CodeStoreComponent,
  ]
})
export class WalletsModule {

}
