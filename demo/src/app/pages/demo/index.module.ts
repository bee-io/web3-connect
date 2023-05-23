import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DEMOComponent} from "./demo.component";
import {ShareModule} from "../../share/share.module";

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: '', component: DEMOComponent},
    ])
  ],
  declarations:[
    DEMOComponent,
  ]
})
export class WEB3ConnectDemoModule {

}
