import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export abstract class Destroyable implements OnDestroy {
  private readonly unsubscribe$$ = new Subject<void>();
  protected readonly unsubscribe$ = this.unsubscribe$$.asObservable();

  protected readonly subscriptions: Subscription[] = [];
  protected interval: number;

  protected unsubscribeAll(clean = false): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());

    if (clean) {
      this.subscriptions.length = 0;
    }
  }

  // don't forget to call super.ngOnDestroy() if you want to use inside your component ngOnDestroy()
  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
    this.unsubscribeAll();
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }
}
