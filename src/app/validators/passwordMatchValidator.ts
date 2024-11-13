import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Check if both controls are present
  if (!password || !confirmPassword) {
    return null;
  }

  // Check if the values match
  if (password.value !== confirmPassword.value) {
    // Set an error on the confirmPassword control if the values don't match
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    // If they match, clear any previous error
    confirmPassword.setErrors(null);
    return null;
  }
}
