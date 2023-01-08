import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private element: ElementRef) {}

  @Output() clickedOutside = new EventEmitter();

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.element.nativeElement.contains(event.target) || event.button !== 0) {
      return;
    }
    this.clickedOutside.emit();
  }

  @HostListener('document:keydown', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }
    this.clickedOutside.emit();
  }

}
