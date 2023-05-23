import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'introduction', loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)},
      { path: 'popover', loadChildren: () => import('./popover/index.module').then(m => m.NzDemoPopoverModule)},
    ])
  ],
})
export class WEB3ConnectDocsModule {

}
