import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre [ngClass]="appLanguage"><code [innerHTML]="code"></code></pre>
  `
})
export class NzHighlightComponent implements OnInit {
  public code: SafeHtml | string = '';
  @ViewChild('code', { static: true }) codeElement!: ElementRef;
  @Input() public appLanguage: string;

  @Input()
  get appCode(): string | SafeHtml {
    return this.code || '';
  }

  set appCode(value: string | SafeHtml) {
    this.code = this.sanitizer.bypassSecurityTrustHtml(value as string);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
