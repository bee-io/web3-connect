import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTER_LIST } from '../../router';

@Component({
  selector: 'nz-nav-bottom',
  template: `
    <section class="prev-next-nav">
      <a class="prev-page" *ngIf="index - 1 >= 0" [routerLink]="list[index - 1]?.path">
        <span nz-icon nzType="left" class="footer-nav-icon-before"></span>{{ list[index - 1]?.label
        }}<span nz-icon nzType="right" class="footer-nav-icon-after"></span>
      </a>
      <a class="next-page" *ngIf="index + 1 < list.length" [routerLink]="list[index + 1]?.path">
        <span nz-icon nzType="left" class="footer-nav-icon-before"></span>{{ list[index + 1]?.label
        }}<span nz-icon nzType="right" class="footer-nav-icon-after"></span>
      </a>
    </section>
  `
})
export class NzNavBottomComponent implements OnInit {
  // tslint:disable-next-line:no-any
  list: any[] = [];
  index = 0;

  constructor(private router: Router, private platform: Platform, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = window.location.pathname.slice(1);
        this.list = [
          ...ROUTER_LIST.intro,
        ];
        this.index = this.list.findIndex(item => item.path === url);
        this.cdr.markForCheck();
      }
    });
  }


}
