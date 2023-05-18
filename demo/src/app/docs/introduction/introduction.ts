import { Component } from '@angular/core';
import {AppService} from "../../app.service";
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.html',
  preserveWhitespaces: false
})
export class DocIntroductionComponent {

  constructor(public appService: AppService) {}
  goLink(link: string) {
    if (window) {
      window.location.hash = link;
    }
  }
}
