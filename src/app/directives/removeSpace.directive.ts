

import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[spaceRemover]'
})
export class SpaceRemoverDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const newValue = value.replace(/\s/g, ''); // Remove spaces
    this.el.nativeElement.value = newValue; // Update input value
  }
  @HostListener('keydown.space', ['$event'])
  onSpace(event) {
    event?.preventDefault()
  }
}
