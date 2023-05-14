import {Component, Input} from '@angular/core';

@Component({
  selector: 'web3-connect-spinner',
  templateUrl: './web3-connect-spinner.component.html',
  styleUrls: ['./web3-connect-spinner.component.scss'],
})

export class Web3ConnectSpinnerComponent {

  @Input() public size?: string = '2rem';
  @Input() public description?: string = ''

}


