import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DEMOComponent} from "./demo.component";
import {ShareModule} from "../../share/share.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ConnectBtnModule} from "../../share/connect-btn/connect-btn.module";

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      {path: '', component: DEMOComponent},
    ]),
    NzButtonModule,
    NzRadioModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzFormModule,
    NzSelectModule,
    NzWaveModule,
    ConnectBtnModule
  ],
  declarations:[
    DEMOComponent,
  ]
})
export class WEB3ConnectDemoModule {

}
