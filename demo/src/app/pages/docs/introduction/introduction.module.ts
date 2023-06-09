import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {IntroductionComponent} from "./introduction.component";
import {NzImageModule} from "ng-zorro-antd/image";

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild([
            {path: '', component: IntroductionComponent},
        ]),
        NzImageModule
    ],
  declarations: [
    IntroductionComponent,
  ]
})
export class IntroductionModule {

}
