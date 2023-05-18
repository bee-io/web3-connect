import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';

import {DocIntroductionComponent} from './introduction/introduction';

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: 'introduction', component: DocIntroductionComponent},
    ])
  ],
  declarations: [
    DocIntroductionComponent,
  ]
})
export class WEB3ConnectDocsModule {

}
