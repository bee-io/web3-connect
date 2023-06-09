import { fromEvent, takeUntil } from 'rxjs'
import { reset$ } from './streams'
import type { BuiltInThemes, Theme, ThemingMap } from './types'

export const themes = {
  light: {
    '--b-ee-background-color': '#ffffff',
    '--b-ee-foreground-color': '#EFF1FC',
    '--b-ee-text-color': '#1a1d26',
    '--b-ee-border-color': '#d0d4f7',
    '--b-ee-action-color': '#6370E5',
    '--b-ee-border-radius': '16px',
    '--b-ee-font-family': 'inherit'
  },
  dark: {
    '--b-ee-background-color': '#1A1D26',
    '--b-ee-foreground-color': '#242835',
    '--b-ee-text-color': '#EFF1FC',
    '--b-ee-border-color': '#33394B',
    '--b-ee-action-color': '#929bed',
    '--b-ee-border-radius': '16px',
    '--b-ee-font-family': 'inherit'
  }
}

export const returnTheme = (theme: Theme): void | ThemingMap => {
  if (typeof theme === 'string' && theme === 'system') {
    return watchForSystemThemeChange()
  }
  return returnThemeMap(theme)
}

export const returnThemeMap = (theme: Theme): void | ThemingMap => {
  if (typeof theme === 'string' && theme in themes) {
    return themes[theme as BuiltInThemes]
  }
  if (typeof theme === 'object') {
    return theme
  }
}

export const handleThemeChange = (update: ThemingMap): void => {
  Object.keys(update).forEach(targetStyle => {
    document.documentElement.style.setProperty(
      targetStyle,
      update[targetStyle as keyof ThemingMap]
    )
  })
}

export const watchForSystemThemeChange = (): void => {
  const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)')
  systemThemeDark.matches
    ? handleThemeChange(themes['dark'])
    : handleThemeChange(themes['light'])

  fromEvent(systemThemeDark, 'change')
    .pipe(takeUntil(reset$))
    .subscribe((changes: Event) => {
      const themeChange = changes as MediaQueryListEvent
      themeChange.matches
        ? handleThemeChange(themes['dark'])
        : handleThemeChange(themes['light'])
    })
}
