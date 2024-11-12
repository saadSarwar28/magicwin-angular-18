import { AbstractControl, ValidatorFn } from '@angular/forms';
export function minMaxValidator(min: any, max: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valueToValidate = control.value;
    if (valueToValidate > max) {
      control.setValue(max);
    }
    if (valueToValidate < min) {
      control.setValue(min);
    }
    return null;
  };
}
