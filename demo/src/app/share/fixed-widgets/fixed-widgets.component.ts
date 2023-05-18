import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fixed-widgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed-widgets">
      <div
        class="ant-avatar ant-avatar-circle ant-avatar-icon fixed-widgets-avatar"
        style="width: 44px; height: 44px; line-height: 44px; font-size: 22px;"
        nz-dropdown
        nzPlacement="topCenter"
        [nzDropdownMenu]="menu"
      >
        <theming-icon></theming-icon>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu nzSelectable>
            <li nz-menu-item (click)="onThemeChange('dark')">Dark Theme</li>
            <li nz-menu-item (click)="onThemeChange('compact')">Light Theme</li>
          </ul>
        </nz-dropdown-menu>
      </div>
    </div>
  `
})
export class FixedWidgetsComponent {
  public compact = true;
  @Input() theme: string = 'dark';
  @Output() readonly themeChange = new EventEmitter<string>();

  onThemeChange(theme: string): void {
    this.theme = theme;
    this.themeChange.emit(theme);
  }
}
