import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShareModule} from "../../../share/share.module";
import {IntroductionComponent} from "./introduction.component";

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: '', component: IntroductionComponent},
    ])
  ],
  declarations: [
    IntroductionComponent,
  ]
})
export class IntroductionModule {

}
