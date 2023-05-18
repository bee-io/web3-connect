import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {Web3ConnectModule} from "@b-ee/web3-connect";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing.module";
import {NzAffixModule} from "ng-zorro-antd/affix";
import {SideComponent} from "./components/side/side.component";
import { NzContributorsListModule } from './share/contributors-list/contributors-list.module';
import { FixedWidgetsModule } from './share/fixed-widgets/fixed-widgets.module';
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
import {EditOutline, LeftOutline, RightOutline} from "@ant-design/icons-angular/icons";
import {IconDefinition} from "@ant-design/icons-angular";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NZ_CONFIG} from "ng-zorro-antd/core/config";
import {FooterModule} from "./components/footer/footer.module";
import {DEMOComponent} from "./pages/demo/demo.component";
import {HomeComponent} from "./pages/home/home.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {ExamplesComponent} from "./pages/examples/examples.component";


const icons: IconDefinition[] = [LeftOutline, RightOutline, EditOutline];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaqComponent,
    ExamplesComponent,
    DEMOComponent,
    SideComponent
  ],
  imports: [
    Web3ConnectModule,
    BrowserModule.withServerTransition({ appId: 'docs' }),
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    NzAffixModule,
    NzNavBottomModule,
    FixedWidgetsModule,
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
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ,
],
  providers: [
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
