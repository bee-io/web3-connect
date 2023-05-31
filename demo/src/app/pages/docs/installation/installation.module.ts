import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {InstallationComponent} from "./installation.component";
import {NzImageModule} from "ng-zorro-antd/image";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: '', component: InstallationComponent},
        ]),
        NzImageModule
    ],
  declarations: [
    InstallationComponent,
  ]
})
export class InstallationModule {

}
