import {Component, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'notification-timer',
  templateUrl: './notification-timer.component.html',
  styleUrls: ['./notification-timer.component.scss'],
})

export class NotificationTimerComponent implements OnDestroy{

  @Input() public startTime:  any;
  public currentTime = Date.now()
  public intervalId = setInterval(() => {
    this.currentTime = Date.now()
  }, 1000);

  public timeString(time: number): string {
    const seconds = Math.floor(time / 1000)
    const formattedSeconds = seconds < 0 ? 0 : seconds
    return formattedSeconds >= 60 ?
      `${Math.floor(formattedSeconds / 60).toLocaleString('en')} ${'notify.time.minutes'}` :
      `${formattedSeconds.toLocaleString('en')} ${'notify.time.seconds'}`
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}


