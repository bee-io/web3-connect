import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GithubButtonComponent } from './github-button.component';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { NavigationComponent } from './navigation.component';
import { SearchbarComponent } from './searchbar.component';
import {ConnectBtnModule} from "../../share/connect-btn/connect-btn.module";
import {ShareModule} from "../../share/share.module";
import {ChangeThemeComponent} from "./change-theme.component";

@NgModule({
  imports: [
    ShareModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NzGridModule,
    NzInputModule,
    NzMenuModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    NzPopoverModule,
    NzAlertModule,
    ConnectBtnModule,
  ],
  declarations: [
    HeaderComponent,
    LogoComponent,
    SearchbarComponent,
    NavigationComponent,
    GithubButtonComponent,
    ChangeThemeComponent
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {

}
