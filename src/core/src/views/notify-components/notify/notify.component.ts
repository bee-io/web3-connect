import {Component, Input} from '@angular/core';
import {Configuration, Notification} from "../../../types";
import { configuration } from '../../../configuration';


@Component({
  selector: 'notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})

export class NotifyComponent{
  protected readonly configuration: Configuration = configuration;

  @Input() public notifications:  Array<Notification>
  @Input() public position: string;

}


