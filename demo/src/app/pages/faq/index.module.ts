import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FaqComponent} from "./faq.component";
import {ShareModule} from "../../share/share.module";

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: '', component: FaqComponent},
    ])
  ],
  declarations:[
    FaqComponent,
  ]
})
export class WEB3ConnectFAQModule {

}
