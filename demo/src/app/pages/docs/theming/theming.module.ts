import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {ThemingComponent} from "./theming.component";
import {NzImageModule} from "ng-zorro-antd/image";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: '', component: ThemingComponent},
        ]),
        NzImageModule
    ],
  declarations: [
    ThemingComponent,
  ]
})
export class ThemingModule {

}
