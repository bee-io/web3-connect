import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import {AppService} from "../../app.service";

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        <div nz-col [nzXs]="24" [nzSm]="24" [nzMd]="6" [nzLg]="6" [nzXl]="5" [nzXXl]="4">
          <app-logo></app-logo>
        </div>
        <div nz-col [nzXs]="0" [nzSm]="0" [nzMd]="18" [nzLg]="18" [nzXl]="19" [nzXXl]="20" class="menu-row">
          <div
            app-searchbar
            [language]="language"
            [responsive]="responsive"
            (focusChange)="onFocusChange($event)"
          ></div>
          <ng-container *ngIf="!isMobile" [ngTemplateOutlet]="menu"></ng-container>
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


          <button
            nz-button
            nzGhost
            nzSize="small"
            class="header-button header-direction-button"
            (click)="toggleDirection()"
          >
            {{ nextDirection | uppercase }}
          </button>
          <web3-connect-github-btn [responsive]="responsive"></web3-connect-github-btn>
        </ng-template>
      </ng-container>
      <app-connect-btn></app-connect-btn>
    </ng-template>
  `
})
export class HeaderComponent implements OnChanges {
  @Input() language: 'ukr' | 'en' = 'en';
  @Input() windowWidth = 1400;
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Output() languageChange = new EventEmitter<'ukr' | 'en'>();
  @Output() directionChange = new EventEmitter<'ltr' | 'rtl'>();

  searching = false;
  isMobile = false;
  mode = 'horizontal';
  responsive: null | 'narrow' | 'crowded' = null;
  nextDirection: 'ltr' | 'rtl' = 'rtl';

  constructor(public appService: AppService, private nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {}

  onFocusChange(focus: boolean): void {
    this.searching = focus;
  }

  onChangeLanguage(language: 'en' | 'ukr'): void {
    this.languageChange.emit(language);
  }

  toggleDirection(): void {
    this.directionChange.emit(this.nextDirection);
    this.nzConfigService.set('modal', { nzDirection: this.nextDirection });
    this.nzConfigService.set('drawer', { nzDirection: this.nextDirection });
    this.nzConfigService.set('message', { nzDirection: this.nextDirection });
    this.nzConfigService.set('notification', { nzDirection: this.nextDirection });
    this.nzConfigService.set('image', { nzDirection: this.nextDirection });
    if (this.nextDirection === 'rtl') {
      this.nextDirection = 'ltr';
    } else {
      this.nextDirection = 'rtl';
    }
    this.cdr.markForCheck();
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