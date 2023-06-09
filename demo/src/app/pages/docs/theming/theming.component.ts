import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../app.service";
import {HighlightService} from "../../../share/services/highlight.service";
@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  preserveWhitespaces: false
})
export class ThemingComponent implements AfterViewChecked {

public readonly exampleHTML: string = `import Init from '@b-ee/web3-connect';

const web3Connect = Init({
  theme: 'dark'
  // other options like wallets, chains, appMetaData, etc.
})
`
public readonly customThemeHTML: string = `import Init, { ThemingMap } from '@b-ee/web3-connect';

const customTheme: ThemingMap = {
    '--b-ee-background-color': '#1A1D26',
    '--b-ee-foreground-color': '#242835',
    '--b-ee-text-color': '#EFF1FC',
    '--b-ee-border-color': '#33394B',
    '--b-ee-action-color': '#929bed',
    '--b-ee-border-radius': '16px',
    '--b-ee-font-family': 'inherit'
}

const web3Connect = Init({
  theme: customTheme
  // other options like wallets, chains, appMetaData, etc.
})
`
public readonly customThemeUpdateHTML: string = `import Init, { ThemingMap } from '@b-ee/web3-connect';

const web3Connect = Init({
  theme: 'dark'
  // other options like wallets, chains, appMetaData, etc.
})

// after initialization you may want to change the theme based on UI state
web3Connect.state.actions.updateTheme('light')

// or

const customTheme: ThemingMap = {
    '--b-ee-background-color': '#1A1D26',
    '--b-ee-foreground-color': '#242835',
    '--b-ee-text-color': '#EFF1FC',
    '--b-ee-border-color': '#33394B',
    '--b-ee-action-color': '#929bed',
    '--b-ee-border-radius': '16px',
    '--b-ee-font-family': 'inherit'
}
web3Connect.state.actions.updateTheme(customTheme)
`
public readonly customThemeTypesUpdateHTML: string = `export type Theme = ThemingMap | BuiltInThemes | 'system'

export type BuiltInThemes =  'dark' | 'light'

export type ThemingMap = {
  '--b-ee-background-color'?: string
  '--b-ee-foreground-color'?: string
  '--b-ee-text-color'?: string
  '--b-ee-border-color'?: string
  '--b-ee-action-color'?: string
  '--b-ee-border-radius'?: string
  '--b-ee-font-family'?: string
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

  goLink(link: string) {
    if (window) {
      window.location.hash = link;
    }
  }
}



