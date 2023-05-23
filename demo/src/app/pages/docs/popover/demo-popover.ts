import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-basic',
  template: `
    <button nz-popover nzType="primary" nzPopoverTitle="Title" nzPopoverContent="Content">
      Hover me 1
    </button>
  `
})
export class NzDemoPopoverBasicComponent {}
