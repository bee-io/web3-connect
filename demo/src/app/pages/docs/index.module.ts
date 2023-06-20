import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'introduction', loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)},
      { path: 'installation', loadChildren: () => import('./installation/installation.module').then(m => m.InstallationModule)},
      { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
      { path: 'theming', loadChildren: () => import('./theming/theming.module').then(m => m.ThemingModule)},
      { path: 'custom-styling', loadChildren: () => import('./custom-styling/custom-styling.module').then(m => m.CustomStylingModule)},
      { path: 'wallets', loadChildren: () => import('./wallets/wallets.module').then(m => m.WalletsModule)},
      { path: 'troubleshooting', loadChildren: () => import('./troubleshooting/troubleshooting.module').then(m => m.TroubleshootingModule)},
      // { path: 'popover', loadChildren: () => import('./popover/index.module').then(m => m.NzDemoPopoverModule)},
    ])
  ],
})
export class WEB3ConnectDocsModule {

}
