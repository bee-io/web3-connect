import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {SiteTheme} from "../../app.component";

@Component({
  selector: 'app-change-theme',
  template: `
      <div
        [ngClass]="theme === 'dark' ? 'dark-theme': 'light-theme'"
        (click)="onThemeChange(theme === 'dark' ? 'light': 'dark')"
        id="switch-theme" aria-label="Switch to dark theme">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 472.39 472.39">
          <g class="toggle-sun">
            <path
              d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"/>
          </g>
          <g class="toggle-circle">
            <circle class="cls-1" cx="236.2" cy="236.2" r="103.78"/>
          </g>
        </svg>
      </div>
  `,
  styles: [
    `
      #switch-theme {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .light-theme svg {
        fill: hsl(246, 23%, 16%);
      }
      .dark-theme svg {
        fill:  hsl(240, 100%, 98%);
      }

      .toggle-circle {
        transition: transform 500ms ease-out;
      }

      .light-theme .toggle-circle {
        transform: translateX(-15%);
      }
    `
  ]
})
export class ChangeThemeComponent {

  @Input() theme: SiteTheme;
  @Output() readonly themeChange = new EventEmitter<string>();
  constructor() {}

  public onThemeChange(theme: SiteTheme): void {
    this.theme = theme;
    this.themeChange.emit(theme);
  }

}
