import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {CoreComponent} from "./core.component";
import {NzImageModule} from "ng-zorro-antd/image";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: '', component: CoreComponent},
        ]),
        NzImageModule
    ],
  declarations: [
    CoreComponent,
  ]
})
export class CoreModule {

}
