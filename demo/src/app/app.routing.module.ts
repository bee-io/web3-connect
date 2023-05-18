import { Routes } from '@angular/router';
import {DEMOComponent} from "./pages/demo/demo.component";
import {HomeComponent} from "./pages/home/home.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {ExamplesComponent} from "./pages/examples/examples.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'docs/introduction'},
  { path: 'demo', component: DEMOComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'docs', loadChildren: () => import('./docs/index.module').then(m => m.WEB3ConnectDocsModule) },
  { path: '**', redirectTo: 'docs/introduction', pathMatch: 'full' }
];
