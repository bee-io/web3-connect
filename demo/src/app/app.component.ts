import {ChangeDetectorRef, Component, Inject, NgZone, Renderer2} from '@angular/core';
import {ROUTER_LIST, RouterList} from "./router";
import {DOCUMENT} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {Platform} from "@angular/cdk/platform";
import {NzMessageRef, NzMessageService} from "ng-zorro-antd/message";
import {NzI18nService} from "ng-zorro-antd/i18n";
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "./app.service";
import {debounceTime, fromEvent} from "rxjs";
import {environment} from "../environments/environment";

type SiteTheme =  'dark' | 'compact';
const defaultKeywords: string = 'Angular, Ethereum Web3, EVM, dApp, MultiChain, Wallet, Transaction, Provider, Hardware Wallet, Notifications, MetaMask, Coinbase, WalletConnect, Trezor, Connect Wallet, Injected Wallet, Crypto, Crypto Wallet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showDrawer: boolean = false;
  public isDrawerOpen: boolean = false;
  public page: 'docs' | 'examples' | 'faq' | string = 'home';
  public windowWidth: number = 1400;
  public routerList: RouterList = ROUTER_LIST;
  public searchComponent = null;
  public theme: SiteTheme = 'dark';
  public language: 'ukr' | 'en' = 'en';
  public direction: 'ltr' | 'rtl' = 'ltr';
 public switchLanguage(language: string): void {
    console.log('switchLanguage', language);
  }
 public switchDirection(direction: 'ltr' | 'rtl'): void {
    this.direction = direction;
    if (direction === 'rtl') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
    }
    this.cdr.detectChanges();
  }
 public initTheme(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const theme = (localStorage.getItem('site-theme') as SiteTheme) || 'dark';
    this.onThemeChange(theme, false);
  }
 public onThemeChange(theme: string, notification: boolean = true): void {
    if (!this.platform.isBrowser) {
      return;
    }
    let loading: NzMessageRef | null = null;
    if (notification) {
      loading = this.nzMessageService.loading('Switching theme...', { nzDuration: 0 });
    }
    this.renderer.addClass(this.document.activeElement, 'preload');
    const successLoaded = () => {
      this.theme = theme as SiteTheme;
      this.appService.theme$.next(theme);
      this.renderer.setAttribute(document.body, 'data-theme', theme);
      localStorage.removeItem('site-theme');
      localStorage.setItem('site-theme', theme);
      ['dark', 'compact']
        .filter(item => item !== theme)
        .forEach(item => {
          const dom = document.getElementById(`site-theme-${item}`);
          if (dom) {
            dom.remove();
          }
        });
      setTimeout(() => this.renderer.removeClass(this.document.activeElement, 'preload'));
      if (notification) {
        this.nzMessageService.remove(loading?.messageId);
        this.nzMessageService.success('Switching theme successfully');
      }
    };
    if (theme !== 'default') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = `site-theme-${theme}`;
      style.href = `assets/${theme}.css`;
      document.body.append(style);

      style.onload = () => {
        successLoaded();
      };
      style.onerror = () => {
        this.nzMessageService.remove(loading?.messageId);
        this.nzMessageService.error('Switching theme failed');
        document.getElementById(style.id)?.remove();
      };
    } else {
      successLoaded();
    }
  }


  constructor(
    private appService: AppService,
    private router: Router,
    private title: Title,
    private nzI18nService: NzI18nService,
    private nzMessageService: NzMessageService,
    private ngZone: NgZone,
    private platform: Platform,
    private meta: Meta,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: any
  ) {}


  public navigateToPage(url: string): void {
    if (url) {
      this.router.navigateByUrl(url).then();
    }
  }

  public setPage(url: string): void {
    const match = url.match(/\/(\w+)/);
    if (match && match[1]) {
      this.page = match[1];
    }
  }

  public ngOnInit(): void {
    this.initTheme();
    if (this.platform.isBrowser) {
      this.renderer.removeClass(this.document.activeElement, 'preload');
      this.addWindowWidthListener();
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentIntroComponent = this.routerList.intro.find(component => `/${component.path}` === this.router.url);
        if (currentIntroComponent) {
          if (/docs\/introduce/.test(this.router.url)) {
            this.updateMateTitle(`Web3-Connect - Documentation`);
          } else {
            this.updateMateTitle(`${currentIntroComponent.label} | Web3-Connect`);
          }
          this.updateDocMetaAndLocale(currentIntroComponent.description, currentIntroComponent.label);
        } else {
          this.updateMateTitle(`Web3-Connect - Documentation`);
          this.updateDocMetaAndLocale();
        }

        if (this.router.url !== '/' + this.searchComponent) {
          this.searchComponent = null;
        }
        this.setPage(this.router.url);

        if (environment.production && this.platform.isBrowser) {
          window.scrollTo(0, 0);
        }
        setTimeout(() => {
          const toc = this.router.parseUrl(this.router.url).fragment || '';
          if (toc) {
            if (this.platform.isBrowser) {
              document.querySelector(`#${toc}`)!.scrollIntoView();
            }
          }
        }, 200);
      }
    });
  }

  public updateMateTitle(title: string = 'Web3-Connect | Documentation'): void {
    this.title.setTitle(title);
    this.meta.updateTag({
      property: 'og:title',
      content: title
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: title
    });
  }

  updateDocMetaAndLocale(description?: string, keywords?: string, path?: string): void {
    const isEn = this.language === 'en';
    const enDescription = 'Web3-Connect provides a fast and simple solution for integrating multiple wallets and supporting various blockchain networks in your project. By incorporating pre-built components for over 35 different hardware and software wallets, Web3-Connect streamlines your development process and eliminates unnecessary difficulties.';
    const ukrDescription = 'Web3-Connect надає швидке та просте рішення для інтеграції кількох гаманців і підтримки різних блокчейн-мереж у вашому проекті. Включаючи готові компоненти для понад 35 різних апаратних і програмних гаманців, Web3-Connect спрощує ваш процес розробки та усуває непотрібні труднощі.';
    let descriptionContent = isEn ? enDescription : ukrDescription;
    if (description) {
      descriptionContent = description;
    }
    this.meta.updateTag({
      name: 'keywords',
      content: keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords
    });

    this.meta.updateTag({
      name: 'description',
      content: descriptionContent
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: descriptionContent
    });
    this.meta.updateTag({
      property: 'og:description',
      content: descriptionContent
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: isEn ? 'en_US' : 'uk_UA'
    });
    const doc = this.document as Document;
    this.renderer.setAttribute(doc.documentElement, 'lang', isEn ? 'en' : 'ukr');
  }


  private addWindowWidthListener(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.setShowDrawer();
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(50))
        .subscribe(() => {
          this.setShowDrawer();
        });
    });
  }
  public setShowDrawer(): void {
    if (this.platform.isBrowser) {
      const width = window.innerWidth;
      this.windowWidth = width;
      this.showDrawer = width <= 768;
    }
  }

}
