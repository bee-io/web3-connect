import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {Web3ConnectModule} from "@b-ee/web3-connect";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    Web3ConnectModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
