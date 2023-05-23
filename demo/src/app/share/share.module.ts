import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCodeBoxModule } from './codebox/codebox.module';
import { NzGithubBtnModule } from './github-btn/github-btn.module';
import { NzHighlightModule } from './highlight/highlight.module';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzPopoverModule} from "ng-zorro-antd/popover";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzGithubBtnModule,
    NzToolTipModule,
    NzAnchorModule,
    NzAffixModule,
    NzGridModule,
    NzIconModule,
    NzPopoverModule,
    NzTabsModule,
    // third libs
    DragDropModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzAnchorModule,
    NzAffixModule,
    NzGithubBtnModule,
    NzGridModule,
    NzToolTipModule,
    NzPopoverModule,
    NzIconModule,
    // third libs
    ScrollingModule,
    DragDropModule,
    NzTabsModule
  ]
})
export class ShareModule {}
