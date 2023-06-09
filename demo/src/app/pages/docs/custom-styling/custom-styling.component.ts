import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../app.service";
import {HighlightService} from "../../../share/services/highlight.service";
@Component({
  selector: 'app-custom-styling',
  templateUrl: './custom-styling.component.html',
  preserveWhitespaces: false
})
export class CustomStylingComponent implements AfterViewChecked {
  public readonly customPropertiesHTML: string = `:root {
  /* CUSTOMIZE THE COLOR  PALETTE */
  --b-ee-white: white;
  --b-ee-black: black;
  --b-ee-primary-1: #2f80ed;
  --b-ee-primary-100: #eff1fc;
  --b-ee-primary-200: #d0d4f7;
  --b-ee-primary-300: #b1b8f2;
  --b-ee-primary-400: #929bed;
  --b-ee-primary-500: #6370e5;
  --b-ee-primary-600: #454ea0;
  --b-ee-primary-700: #323873;
  --b-ee-gray-100: #ebebed;
  --b-ee-gray-200: #c2c4c9;
  --b-ee-gray-300: #999ca5;
  --b-ee-gray-400: #707481;
  --b-ee-gray-500: #33394b;
  --b-ee-gray-600: #242835;
  --b-ee-gray-700: #1a1d26;
  --b-ee-success-100: #d1fae3;
  --b-ee-success-200: #baf7d5;
  --b-ee-success-300: #a4f4c6;
  --b-ee-success-400: #8df2b8;
  --b-ee-success-500: #5aec99;
  --b-ee-success-600: #18ce66;
  --b-ee-success-700: #129b4d;
  --b-ee-danger-100: #ffe5e6;
  --b-ee-danger-200: #ffcccc;
  --b-ee-danger-300: #ffb3b3;
  --b-ee-danger-400: #ff8080;
  --b-ee-danger-500: #ff4f4f;
  --b-ee-danger-600: #cc0000;
  --b-ee-danger-700: #660000;
  --b-ee-warning-100: #ffefcc;
  --b-ee-warning-200: #ffe7b3;
  --b-ee-warning-300: #ffd780;
  --b-ee-warning-400: #ffc74c;
  --b-ee-warning-500: #ffaf00;
  --b-ee-warning-600: #cc8c00;
  --b-ee-warning-700: #664600;

  /* CUSTOMIZE ACCOUNT CENTER*/
  --account-center-z-index
  --account-center-position-top
  --account-center-position-bottom
  --account-center-position-right
  --account-center-position-left
  --account-center-minimized-background
  --account-center-maximized-upper-background
  --account-center-maximized-network-section
  --account-center-maximized-app-info-section
  --account-center-minimized-address-color
  --account-center-maximized-address-color
  --account-center-maximized-account-section-background-hover
  --account-center-maximized-action-background-hover
  --account-center-minimized-chain-select-background
  --account-center-network-selector-color
  --account-center-maximized-network-selector-color
  --account-center-minimized-network-selector-color
  --account-center-app-btn-text-color
  --account-center-app-btn-background
  --account-center-app-btn-font-family
  --account-center-border
  --account-center-box-shadow
  --account-center-border-radius
  --account-center-chain-warning
  --account-center-minimized-balance-color
  --account-center-minimized-chain-select-background
  --account-center-maximized-network-section-background
  --account-center-maximized-network-text-color
  --account-center-maximized-info-section-background-color
  --account-center-maximized-upper-action-color
  --account-center-maximized-upper-action-background-hover
  --account-center-maximized-app-name-color
  --account-center-maximized-app-info-color
  --account-center-micro-background

  /* CUSTOMIZE SECTIONS OF THE CONNECT MODAL */
  --b-ee-connect-content-width
  --b-ee-connect-content-height
  --b-ee-wallet-columns
  --b-ee-connect-sidebar-background
  --b-ee-connect-sidebar-color
  --b-ee-connect-sidebar-progress-background
  --b-ee-connect-sidebar-progress-color
  --b-ee-connect-header-background
  --b-ee-connect-header-color
  --b-ee-main-scroll-container-background
  --b-ee-link-color
  --b-ee-close-button-background
  --b-ee-close-button-color
  --b-ee-checkbox-background
  --b-ee-checkbox-color
  --b-ee-wallet-button-background
  --b-ee-wallet-button-background-hover
  --b-ee-wallet-button-color
  --b-ee-wallet-button-border-color
  --b-ee-wallet-button-border-radius
  --b-ee-wallet-button-box-shadow
  --b-ee-wallet-app-icon-border-color

  /* FONTS */
  --b-ee-font-family-normal:  Inter, sans-serif;

  --b-ee-font-size-1: 3rem;
  --b-ee-font-size-2: 2.25rem;
  --b-ee-font-size-3: 1.5rem;
  --b-ee-font-size-4: 1.25rem;
  --b-ee-font-size-5: 1rem;
  --b-ee-font-size-6: 0.875rem;
  --b-ee-font-size-7: 0.75rem;

  /* SPACING */
  --b-ee-spacing-1: 3rem;
  --b-ee-spacing-2: 2rem;
  --b-ee-spacing-3: 1.5rem;
  --b-ee-spacing-4: 1rem;
  --b-ee-spacing-5: 0.5rem;

  /* BORDER RADIUS */
  --b-ee-border-radius-1: 24px;
  --b-ee-border-radius-2: 20px;
  --b-ee-border-radius-3: 16px;

  /* SHADOWS */
  --b-ee-shadow-0: none;
  --b-ee-shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --b-ee-shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);

  /* NOTIFY STYLES */
  --notify-b-ee-font-family-normal
  --notify-b-ee-font-size-5
  --notify-b-ee-gray-300
  --notify-b-ee-gray-600
  --notify-b-ee-border-radius
  --notify-b-ee-font-size-7
  --notify-b-ee-font-size-6
  --notify-b-ee-line-height-4
  --notify-b-ee-primary-100
  --notify-b-ee-primary-400
  --notify-b-ee-main-padding
  --notify-b-ee-z-index
  --notify-b-ee-background
  --notify-b-ee-close-icon-color
  --notify-b-ee-close-icon-hover
  --notify-b-ee-transaction-status-color
  --notify-b-ee-transaction-font-size
  --notify-b-ee-hash-time-font-size
  --notify-b-ee-hash-time-font-line-height
  --notify-b-ee-address-hash-color
  --notify-b-ee-anchor-color
}
`
  private highlighted: boolean = false;

  constructor(public appService: AppService, private highlightService: HighlightService) {}

  public ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }
}



