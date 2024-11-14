
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function minLengthNumberValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined) {
      return null; // Allow empty values, you can customize this behavior
    }

    const stringValue = value.toString();

    if (stringValue.length < minLength ) {
      return { 'minLength': true };
    }

    return null; // Validation passed
  };
}
