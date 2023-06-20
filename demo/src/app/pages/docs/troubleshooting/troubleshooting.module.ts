import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {TroubleshootingComponent} from "./troubleshooting.component";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: '', component: TroubleshootingComponent},
        ]),
    ],
  declarations: [
    TroubleshootingComponent,
  ]
})
export class TroubleshootingModule {

}
