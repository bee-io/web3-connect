import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterList } from '../../router';

@Component({
  selector: 'app-side',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul nz-menu [nzMode]="'inline'" class="aside-container menu-site" [nzInlineIndent]="40" [class.ant-menu-rtl]="direction === 'rtl'">
      <ng-container *ngIf="page === 'docs'">
        <li *ngFor="let intro of routerList.intro" nz-menu-item nzMatchRouter [hidden]="intro.hidden">
          <a routerLink="{{ intro.path }}">{{ intro.label }}</a>
        </li>
      </ng-container>
    </ul>
  `
})
export class SideComponent {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Input() routerList: RouterList = {} as RouterList;
  @Input() language: 'ua' | 'en' = 'en';
}
