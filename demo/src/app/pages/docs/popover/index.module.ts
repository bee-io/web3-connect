import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoPopoverBasicComponent } from './demo-popover';
import {NzDemoPopoverComponent} from './index.component';
import {ShareModule} from "../../../share/share.module";

@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      { path: '', component: NzDemoPopoverComponent },
    ])
  ],
  declarations: [
		NzDemoPopoverBasicComponent,
    NzDemoPopoverComponent,
  ]
})
export class NzDemoPopoverModule {

}
