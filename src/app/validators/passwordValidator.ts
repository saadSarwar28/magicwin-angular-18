import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null; // No validation error if the field is empty
    }

    // Regular expressions for checking password conditions
    const lengthCondition = /^.{8}$/;
    const uppercaseCondition = /[A-Z]/;
    const lowercaseCondition = /[a-z]/;
    const digitCondition = /\d/;
    const specialCharacterCondition = /[@#$%^&+=!?<>/_]/;

    const errors: ValidationErrors = {};

    if (!lengthCondition.test(password)) {
      errors.invalidPasswordLength = 'Password must be 8 characters long.';

    }

    // if (!uppercaseCondition.test(password)) {
    //   errors.invalidPasswordUppercase = 'Password must contain at least one uppercase letter.';
    // }

    // if (!lowercaseCondition.test(password)) {
    //   errors.invalidPasswordLowercase = 'Password must contain at least one lowercase letter.';
    // }

    // if (!digitCondition.test(password)) {
    //   errors.invalidPasswordDigit = 'Password must contain at least one digit.';
    // }

    // if (!specialCharacterCondition.test(password)) {
    //   errors.invalidPasswordSpecialCharacter = 'Password must contain at least one special character.';
    // }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
