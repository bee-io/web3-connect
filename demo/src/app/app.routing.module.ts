import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'examples', loadChildren: () => import('./pages/examples/index.module').then(m => m.WEB3ConnectExamplesModule) },
  { path: 'faq', loadChildren: () => import('./pages/faq/index.module').then(m => m.WEB3ConnectFAQModule) },
  { path: 'demo', loadChildren: () => import('./pages/demo/index.module').then(m => m.WEB3ConnectDemoModule) },
  { path: 'docs', loadChildren: () => import('./pages/docs/index.module').then(m => m.WEB3ConnectDocsModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
