import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectComponent} from "./connect-components/connect/connect.component";
import {AgreementComponent} from "./connect-components/agreement/agreement.component";
import {InstallWalletComponent} from "./connect-components/install-wallet/install-wallet.component";
import {SelectingWalletComponent} from "./connect-components/selecting-wallet/selecting-wallet.component";
import {WalletButtonComponent} from "./connect-components/wallet-button/wallet-button.component";
import {ConnectingWalletComponent} from "./connect-components/connecting-wallet/connecting-wallet.component";
import {ConnectedWalletComponent} from "./connect-components/connected-wallet/connected-wallet.component";
import {NotifyComponent} from "./notify-components/notify/notify.component";
import {NotificationComponent} from "./notify-components/notification/notification.component";
import {NotificationContentComponent} from "./notify-components/notification-content/notification-content.component";
import {NotificationTimerComponent} from "./notify-components/notification-timer/notification-timer.component";
import {NotificationStatusComponent} from "./notify-components/notification-status/notification-status.component";
import {AccountCenterComponent} from "./account-center-components/account-center/account-center.component";
import {AccountCenterMinComponent} from "./account-center-components/account-center-min/account-center-min.component";
import {AccountCenterMaxComponent} from "./account-center-components/account-center-max/account-center-max.component";
import {AccountCenterWalletComponent} from "./account-center-components/account-center-wallet/account-center-wallet.component";
import {Web3ConnectSvgComponent} from "./shared/web3-connect-svg/web3-connect-svg.component";
import {Web3ConnectWarningComponent} from "./shared/web3-connect-warning/web3-connect-warning.component";
import {Web3ConnectBadgeComponent} from "./shared/web3-connect-badge/web3-connect-badge.component";
import {Web3ConnectSpinnerComponent} from "./shared/web3-connect-spinner/web3-connect-spinner.component";
import {Web3ConnectNetworkSelectComponent} from "./shared/web3-connect-network-select/web3-connect-network-select.component";
import {FormsModule} from "@angular/forms";
import {NotificationChainComponent} from "./notify-components/notification-chain/notification-chain.component";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {TokenListComponent} from "./token-list/token-list.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ClickedOutsideDirective} from "./account-center-components/account-center-max/click-outside.directive";
import {Web3ConnectComponent} from "./web3-connect.component";

export { Web3ConnectComponent } from "./web3-connect.component";
@NgModule({
  declarations: [
    Web3ConnectComponent,
    AgreementComponent,
    InstallWalletComponent,
    SelectingWalletComponent,
    WalletButtonComponent,
    ConnectingWalletComponent,
    ConnectedWalletComponent,
    ConnectComponent,

    NotifyComponent,
    NotificationComponent,
    NotificationContentComponent,
    NotificationTimerComponent,
    NotificationStatusComponent,
    NotificationChainComponent,

    AccountCenterComponent,
    AccountCenterMinComponent,
    AccountCenterMaxComponent,
    AccountCenterWalletComponent,
    ClickedOutsideDirective,

    Web3ConnectSvgComponent,
    Web3ConnectWarningComponent,
    Web3ConnectBadgeComponent,
    Web3ConnectSpinnerComponent,
    Web3ConnectNetworkSelectComponent,

    TokenListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  exports:[Web3ConnectComponent]
})
export class Web3ConnectModule {
  // static forRoot(): ModuleWithProviders<BeeWeb3ConnectModule> {
  //   return {
  //     ngModule: BeeWeb3ConnectModule,
  //   };
  // }
}
