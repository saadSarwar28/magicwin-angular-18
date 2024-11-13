import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumericMaxlength]'
})
export class NumericMaxlengthDirective {
  @Input() appNumericMaxlength!: number;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const maxLength = this.appNumericMaxlength;
    if (value.length > maxLength) {
        this.ngControl?.control?.setValue(value.substring(0, maxLength));
    }
  }
}
