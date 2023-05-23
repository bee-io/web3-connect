import { Component, QueryList, ViewChildren } from '@angular/core';
import {NzCodeBoxComponent} from "../../../share/codebox";

@Component({
  selector: 'nz-demo-popover',
  preserveWhitespaces: false,
  templateUrl  : './index.html'
})
export class NzDemoPopoverComponent {
  public expanded = true;
  @ViewChildren(NzCodeBoxComponent) codeBoxes!: QueryList<NzCodeBoxComponent>;

  goLink(link: string): void {
    if (window) {
      window.location.hash = link;
    }
  }

  expandAllCode(): void {
    this.expanded = !this.expanded;
    this.codeBoxes.forEach(code => {
      code.nzExpanded = this.expanded;
      code.expandCode(this.expanded);
      code.check();
    });
  }

}
