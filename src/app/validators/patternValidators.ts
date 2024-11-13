import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function patternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Return if empty
    }

    // Check for identical numbers (e.g., 1111)
    const identicalNumbers = /^(.)\1{3,}$/;
    if (identicalNumbers.test(value)) {
      return { identicalNumbers: true };
    }

    // Check for sequential numbers (e.g., 1234, 2345)
    const sequentialNumbers = (num: string) => {
      for (let i = 0; i < num.length - 1; i++) {
        if (parseInt(num[i], 10) + 1 !== parseInt(num[i + 1], 10)) {
          return false;
        }
      }
      return true;
    };
    if (sequentialNumbers(value)) {
      return { sequentialNumbers: true };
    }

    return null; // Return null if no errors
  };
}
