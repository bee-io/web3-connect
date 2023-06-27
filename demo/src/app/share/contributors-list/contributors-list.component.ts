import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'nz-contributors-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul *ngIf="list.length" class="contributors-list" style="display: flex; list-style: none; margin: 0px; padding: 0px;">
      <a
        *ngFor="let item of list"
        nz-tooltip
        [nzTooltipTitle]="('Contributors') + item.name"
        [attr.href]="item.url"
        target="_blank"
      >
        <nz-avatar [nzText]="item.name" [nzSrc]="item.avatar"></nz-avatar>
      </a>
    </ul>
  `
})
export class NzContributorsListComponent implements OnInit {
  public list: any[] = [];

  constructor(
    private router: Router,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.getContributors();
    this.cdr.markForCheck();
  }
  private getContributors(): void {
    this.http
      .get(`https://api.github.com/repos/bee-io/web3-connect/commits`)
      .subscribe(data => {
        if (Array.isArray(data)) {
          // tslint:disable-next-line:no-any
          const list: any[] = [];
          data
            .filter(e => e.author && e.author.login)
            .forEach(e => {
              const id = e.author.login;
              const index = list.findIndex(i => i.id === id);
              if (index === -1) {
                list.push({
                  id,
                  count: 1,
                  name: e.commit && e.commit.author.name,
                  url: `https://github.com/${id}`,
                  avatar: e.author.avatar_url
                });
              } else {
                list[index].count = list[index].count + 1;
              }
            });

          this.list = list.sort((a, b) => b.count - a.count);
        } else {
          this.list = [];
        }
        this.cdr.markForCheck();
      });
  }
}
