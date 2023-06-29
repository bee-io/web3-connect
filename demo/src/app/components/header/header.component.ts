import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {AppService, SiteTheme} from "../../app.service";

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

@Component({
  selector: 'app-header',
  template: `
    <header id="header" class="clearfix">

      <span
        class="nav-phone-icon"
        *ngIf="isMobile"
        style=""
        nzPopoverOverlayClassName="popover-menu"
        nzPopoverPlacement="bottomRight"
        nz-popover
        nz-button
        [nzPopoverContent]="menu"
      >
        <span style="margin-left: -30px;">
           <svg [style.fill]="(appService.theme$ | async) === 'dark' ? '#FFFFFF':'#000000'" aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-three-bars" style="user-select: initial;">
            <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
           </svg>
        </span>

      </span>

      <div nz-row style="flex-flow: nowrap">
        <div nz-col [nzXs]="4" [nzSm]="4" [nzMd]="6" [nzLg]="6" [nzXl]="5" [nzXXl]="4">
          <app-logo [isMobile]="isMobile"></app-logo>
        </div>
        <div nz-col [nzXs]="20" [nzSm]="20" [nzMd]="18" [nzLg]="18" [nzXl]="19" [nzXXl]="20" class="menu-row">
<!--          <div-->
<!--            app-searchbar-->
<!--            [language]="language"-->
<!--            [responsive]="responsive"-->
<!--            (focusChange)="onFocusChange($event)"-->
<!--          ></div>-->
          <ng-container *ngIf="!isMobile" [ngTemplateOutlet]="menu"></ng-container>

          <web3-connect-github-btn [responsive]="responsive"></web3-connect-github-btn>

          <app-connect-btn></app-connect-btn>
          <app-change-theme
            [theme]="theme"
            (themeChange)="themeChange.emit($event)"
          ></app-change-theme>

        </div>

      </div>

    </header>
    <ng-template #menu>
      <ng-container *ngIf="!searching || windowWidth > 1200">
        <ng-container *ngIf="windowWidth < 1120; else narrowNavigation">
          <ul
            nz-menu
            app-navagation
            class="menu-site"
            [responsive]="responsive"
            [page]="page"
            [isMobile]="isMobile"
            [nzMode]="isMobile ? 'inline' : 'horizontal'"
            [nzSelectable]="false"
            [(language)]="language"
            (languageChange)="onChangeLanguage($event)"
          ></ul>
        </ng-container>
        <ng-template #narrowNavigation>
          <ul
            nz-menu
            app-navagation
            class="menu-site"
            [responsive]="responsive"
            [page]="page"
            [isMobile]="isMobile"
            [nzMode]="isMobile ? 'inline' : 'horizontal'"
            [nzSelectable]="false"
            [(language)]="language"
            (languageChange)="onChangeLanguage($event)"
          ></ul>
        </ng-template>
      </ng-container>
    </ng-template>

  `
})
export class HeaderComponent implements OnChanges {
  @Input() theme: SiteTheme;
  @Input() language: 'ua' | 'en' = 'en';
  @Input() windowWidth = 1400;
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Output() themeChange = new EventEmitter<SiteTheme>();
  @Output() languageChange = new EventEmitter<'ua' | 'en'>();

  searching = false;
  isMobile = false;
  mode = 'horizontal';
  responsive: null | 'narrow' | 'crowded' = null;
  constructor(public appService: AppService) {
    this.updateResponsive()
  }

  onFocusChange(focus: boolean): void {
    this.searching = focus;
  }

  onChangeLanguage(language: 'en' | 'ua'): void {
    this.languageChange.emit(language);
  }


  updateResponsive(): void {
    this.responsive = null;
    this.isMobile = this.windowWidth <= 768;
    if (this.windowWidth < RESPONSIVE_XS) {
      this.responsive = 'crowded';
    } else if (this.windowWidth < RESPONSIVE_SM) {
      this.responsive = 'narrow';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { windowWidth } = changes;
    if (windowWidth) {
      this.updateResponsive();
    }
  }
}
