import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'web3-connect-github-btn',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="gh-btn" tabindex="-1" [href]="'https://github.com/' + org + '/' + repo" target="_blank" rel="noopener" aria-hidden="true">
      <span class="gh-ico" aria-hidden="true"></span>
      <span class="gh-text">Star</span>
    </a>
<!--    <a-->
<!--      class="gh-count"-->
<!--      target="_blank"-->
<!--      rel="noopener"-->
<!--      [href]="'https://github.com/' + org + '/' + repo + '/stargazers'"-->
<!--    >-->
<!--      {{ starCount }}-->
<!--    </a>-->
  `,
  host: {
    id: 'github-btn',
    class: 'github-btn',
    '[class.responsive-mode]': 'responsive',
    '[class.responsive-narrow]': 'responsive === "narrow"',
    '[class.responsive-crowded]': 'responsive === "crowded"'
  },
  encapsulation: ViewEncapsulation.None
})
export class GithubButtonComponent implements OnInit {
  starCount = 0;
  org = 'bee-io';
  repo = 'web3-connect';
  @Input() responsive: null | 'narrow' | 'crowded' = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private platform: Platform) {}

  public ngOnInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    // this.getStar();
  }

  public getStar(): void {
    this.http.get<{ stargazers_count: number }>(`https://api.github.com/repos/${this.org}/${this.repo}`)
      .subscribe((res: { stargazers_count: number }) => {
        this.starCount = res.stargazers_count;
        this.cdr.markForCheck();
      });
  }
}
