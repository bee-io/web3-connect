import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ExamplesComponent} from "./examples.component";
import {ShareModule} from "../../share/share.module";

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: '', component: ExamplesComponent},
    ])
  ],
  declarations:[
    ExamplesComponent,
  ]
})
export class WEB3ConnectExamplesModule {

}
