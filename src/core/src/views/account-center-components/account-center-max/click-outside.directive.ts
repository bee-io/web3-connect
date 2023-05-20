import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[clickOutside]'
})
export class ClickedOutsideDirective{

  @Output()
  clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if(!this.elemRef.nativeElement.contains(event.target)) {
      // Cliecked Outside
      this.clickOutside.emit(event);
    }
  }

  constructor(private elemRef: ElementRef) {
  }
}
