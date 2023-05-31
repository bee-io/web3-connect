import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ThemingModule} from "./theming/theming.module";
import {CustomStylingModule} from "./custom-styling/custom-styling.module";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'introduction', loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)},
      { path: 'installation', loadChildren: () => import('./installation/installation.module').then(m => m.InstallationModule)},
      { path: 'theming', loadChildren: () => import('./theming/theming.module').then(m => m.ThemingModule)},
      { path: 'custom-styling', loadChildren: () => import('./custom-styling/custom-styling.module').then(m => m.CustomStylingModule)},
      { path: 'popover', loadChildren: () => import('./popover/index.module').then(m => m.NzDemoPopoverModule)},
    ])
  ],
})
export class WEB3ConnectDocsModule {

}
