import { NgModule } from '@angular/core';
import {Web3ConnectComponent, Web3ConnectModule } from './core/src/views/web3-connect.module';
export {Web3ConnectComponent, Web3ConnectModule } from './core/src/views/web3-connect.module';

const BEE_MODULES = [
  Web3ConnectModule,
];
@NgModule({ imports: BEE_MODULES, exports: BEE_MODULES })
export class BeeModule {}

// export {injectedModule, trustModule, walletConnectModule, coinbaseModule} from './wallets';
export * from './wallets';
export * from './core/src';
export * from './gas';
