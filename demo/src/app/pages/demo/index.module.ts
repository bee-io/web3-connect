import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DEMOComponent} from "./demo.component";
import {ShareModule} from "../../share/share.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      {path: '', component: DEMOComponent},
    ]),
    NzButtonModule,
    NzRadioModule,
    NzDividerModule,
    NzWaveModule
  ],
  declarations:[
    DEMOComponent,
  ]
})
export class WEB3ConnectDemoModule {

}
