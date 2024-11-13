import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const pinMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control as FormGroup; // Cast to FormGroup

  const pin = formGroup.get('pin')?.value;
  const confirmPin = formGroup.get('confirmPin')?.value;

  if (pin !== confirmPin) {
    return { pinMismatch: true };
  }
  return null;
};
