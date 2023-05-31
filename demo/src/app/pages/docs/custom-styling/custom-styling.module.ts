import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {CustomStylingComponent} from "./custom-styling.component";
import {NzImageModule} from "ng-zorro-antd/image";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: '', component: CustomStylingComponent},
        ]),
        NzImageModule
    ],
  declarations: [
    CustomStylingComponent,
  ]
})
export class CustomStylingModule {

}
