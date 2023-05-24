import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing.module";
import {NzAffixModule} from "ng-zorro-antd/affix";
import {SideComponent} from "./components/side/side.component";
import { NzContributorsListModule } from './share/contributors-list/contributors-list.module';
import { NzNavBottomModule } from './share/nav-bottom/nav-bottom.module';
import { HeaderModule } from './components/header/header.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NZ_CONFIG} from "ng-zorro-antd/core/config";
import {FooterModule} from "./components/footer/footer.module";
import {HomeComponent} from "./pages/home/home.component";
import {HighlightService} from "./share/services/highlight.service";
import {Web3ConnectModule} from "@b-ee/web3-connect";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'docs'}),
    BrowserAnimationsModule,
    NzAffixModule,
    NzNavBottomModule,
    NzContributorsListModule,
    HeaderModule,
    FooterModule,
    NzGridModule,
    NzAffixModule,
    NzMenuModule,
    NzI18nModule,
    NzSelectModule,
    NzMessageModule,
    NzPopoverModule,
    NzButtonModule,
    NzInputModule,
    NzBadgeModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    Web3ConnectModule
  ],
  providers: [
    HighlightService,
    Title,
    {
      provide: NZ_CONFIG,
      useValue: {
        codeEditor: {
          monacoEnvironment: { globalAPI: true }
        },
        global: { nzDirection: 'ltr' }

      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
