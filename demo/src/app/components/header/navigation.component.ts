import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ul[nz-menu][app-navagation]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li nz-menu-item [nzSelected]="page === 'docs'">
      <a [routerLink]="['docs', 'introduction']">
<!--        <span>{{ language == 'zh' ? '文档' : 'Docs' }}</span>-->
        <span>Docs</span>
      </a>
    </li>
    <li nz-menu-item [nzSelected]="page === 'demo'">
      <a [routerLink]="['demo']">
        <span>Demo</span>
      </a>
    </li>
<!--    <li nz-menu-item [nzSelected]="page === 'examples'">-->
<!--      <a [routerLink]="['examples']">-->
<!--        <span>Examples</span>-->
<!--      </a>-->
<!--    </li>-->
<!--    <li nz-menu-item [nzSelected]="page === 'faq'">-->
<!--      <a [routerLink]="['faq']">-->
<!--        <span>FAQ</span>-->
<!--      </a>-->
<!--    </li>-->

<!--    <ng-container *ngIf="!isMobile && responsive === 'crowded'">-->
<!--      <li nz-submenu [nzTitle]="additionalTitle" nzMenuClassName="top-menu-additional">-->
<!--        <ng-template #additionalTitle></ng-template>-->
<!--        <ul>-->
<!--          <ng-container [ngTemplateOutlet]="additionalItems"></ng-container>-->
<!--        </ul>-->
<!--      </li>-->
<!--    </ng-container>-->
    <ng-container *ngIf="isMobile">
      <ng-container [ngTemplateOutlet]="additionalItems"></ng-container>
    </ng-container>
    <ng-template #additionalItems>
      <li nz-menu-item>
        <a href="https://github.com/bee-io/web3-connect" target="_blank" rel="noopener noreferrer">Github</a>
      </li>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep .top-menu-additional {
        position: relative;
        right: 80px;
        width: 190px;
      }
    `
  ],
  host: {
    id: 'nav'
  },
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Input() language: 'ua' | 'en' = 'en';
  @Output() languageChange = new EventEmitter<'ua' | 'en'>();
  @Input() responsive: null | 'narrow' | 'crowded' = null;
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'home';
  @Input() isMobile = false;

  constructor() {}

  ngOnInit(): void {

  }

  changeLanguage(language: 'ua' | 'en', e: MouseEvent): void {
    e.preventDefault();
    this.languageChange.emit(language);
  }
}
