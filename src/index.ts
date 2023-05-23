import { NgModule } from '@angular/core';
import {BeeWeb3ConnectModule } from './core/src/views/web3-connect.module';

@NgModule({ imports: [...[BeeWeb3ConnectModule]], exports: [...[BeeWeb3ConnectModule]] })
export class Web3ConnectModule {}

export * from './wallets';
export * from './core/src';
export * from './gas';
