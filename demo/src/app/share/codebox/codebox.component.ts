import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppService, DemoCode } from '../../app.service';
import { OnlineIdeService } from '../../online-ide/online-ide.service';

@Component({
  selector: 'app-code-box',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './codebox.component.html',
  styleUrls: ['./codebox.component.scss']
})
export class NzCodeBoxComponent implements OnInit, OnDestroy {
  public highlightCode?: string;
  public copied = false;
  public showIframe: boolean = false;
  public simulateIFrame: boolean = false;
  public iframe?: SafeUrl;
  public theme = 'default';
  public destroy$ = new Subject();
  public codeLoaded = false;
  public onlineIDELoading = false;
  public copyLoading = false;
  @Input() nzExpanded = false;
  @Input() nzLink!: string;
  @Input() nzId!: string;
  @Input() nzIframeHeight: number | null = 360;
  @Input() nzComponentName = '';
  @Input() nzSelector = '';
  @Input() nzGenerateCommand = '';
  @Input() set nzIframeSource(value: string) {
    this.showIframe = value !== 'null' && environment.production;
    this.simulateIFrame = value !== 'null' && !environment.production;
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  // tslint:disable-next-line:no-any
  constructor(
    @Inject(DOCUMENT) private dom: any,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private appService: AppService,
    private platform: Platform,
    private onlineIdeService: OnlineIdeService
  ) {}

  ngOnInit(): void {
    this.appService.theme$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.theme = data;
      this.check();
    });
  }


  copyCode(): void {
    setTimeout(() => {
      this.copyLoading = !this.codeLoaded;
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.copyLoading = false;
      this.check();
      this.copy(data.rawCode).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
          this.check();
        }, 1000);
      });
    });
  }



  copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve): void => {
      // @ts-ignore
      let copyTextArea = null as HTMLTextAreaElement;
      try {
        copyTextArea = this.dom.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        this.dom.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        this.dom.execCommand('copy');
        resolve(value);
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
    });

    return promise;
  }

  expandCode(expanded: boolean): void {
    this.nzExpanded = expanded;
    if (expanded) {
      this.getDemoCode().subscribe();
    }
  }

  openOnlineIDE(ide: 'StackBlitz' | 'CodeSandbox' = 'StackBlitz'): void {
    setTimeout(() => {
      this.onlineIDELoading = !this.codeLoaded;
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.onlineIDELoading = false;
      this.check();
      if (ide === 'StackBlitz') {
        this.onlineIdeService.openOnStackBlitz(this.nzComponentName, data.rawCode, this.nzSelector);
      } else {
        this.onlineIdeService.openOnCodeSandbox(this.nzComponentName, data.rawCode, this.nzSelector);
      }
    });
  }

  check(): void {
    this.cdr.markForCheck();
  }

  getDemoCode(): Observable<DemoCode> {
    return this.appService.getCode(this.nzId).pipe(
      takeUntil(this.destroy$),
      tap(data => {
        if (data) {
          this.highlightCode = data.highlightCode;
          this.codeLoaded = true;
          this.check();
        }
      })
    );
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
