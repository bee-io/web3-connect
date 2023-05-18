import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="/" id="logo">
      <img width="32" height="28.27" alt="logo" [src]="(appService.theme$ | async) === 'dark' ? './assets/img/logo.svg': './assets/img/logo-black.svg'" />
      <strong>Web3-Connect</strong>
    </a>
  `,
  styles: [
    `
      #logo strong {
        font-weight: 500;
      }
    `
  ]
})
export class LogoComponent {
  constructor(public appService: AppService) {}
}
