import {Component, Input} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'web3-connect-svg',
  templateUrl: './web3-connect-svg.component.html',
  styleUrls: ['./web3-connect-svg.component.scss'],
})

export class Web3ConnectSvgComponent{

  @Input() icon?: string;
  @Input() iconPromise?: Promise<string>;
  @Input() iconName: string;
  @Input() width: string = '20px';
  @Input() height: string = '20px';
  public isLoaded: boolean = false;

  constructor( private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer )  {}

  ngOnInit() {
    this.init();
  }
  private init(): void {
      this.iconName = this.iconName.replace(/\s/g, '');
      if(this.iconPromise) {
        this.iconPromise.then(res => {
          this.iconRegistry.addSvgIconLiteral( this.iconName, this.sanitizer.bypassSecurityTrustHtml( res));
          this.isLoaded = true;
        });
      }
  }

  public registerIconName(): string{
    this.iconRegistry.addSvgIconLiteral( this.iconName, this.sanitizer.bypassSecurityTrustHtml(this.icon));
    return this.iconName;
  }

}


