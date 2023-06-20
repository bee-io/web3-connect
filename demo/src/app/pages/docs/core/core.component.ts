import {AfterViewChecked, Component} from '@angular/core';
import {AppService} from "../../../app.service";
import {HighlightService} from "../../../share/services/highlight.service";
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  preserveWhitespaces: false
})
export class CoreComponent implements AfterViewChecked {

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



