import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ConnectBtnComponent} from "./connect-btn.component";
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule
  ],
  declarations: [
    ConnectBtnComponent
  ],
  exports: [
    ConnectBtnComponent
  ]
})
export class ConnectBtnModule {}
