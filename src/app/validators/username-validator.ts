import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';

export function usernameAvailabilityValidator(
  backendService: BackendService,
  recaptchaV3Service: ReCaptchaV3Service
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // Return null if no username is entered
    }

    let value = control.value.trim().replace(/\s+/g, '');
    const specialCharPattern = /[^a-zA-Z0-9]/;

    // Check if the value contains special characters
    if (specialCharPattern.test(value)) {
      control.setErrors({ specialCharacter: true });
      return of({ specialCharacter: true });
    }
    control.setErrors({ checking: true });
    return control.valueChanges.pipe(

      debounceTime(300), // Wait 300ms after the last keystroke before checking
      switchMap((val) => {
        return recaptchaV3Service.execute('importantAction').pipe(
          switchMap((recaptcha) => {
            const checkUserNameModel = { username: value, recaptcha };
            return backendService.CheckUserNameAndPhone('USERNAME', checkUserNameModel);
          }),
          map((response) => {
            if (response.status) {
              control.setErrors(null);
              return null; // Username is available, no error
            } else {
              control.setErrors({ usernameTaken: true });
              return { usernameTaken: true }; // Username is taken
            }
          }),
          catchError(() => {
            control.setErrors({ usernameUnavailable: true });
            control.setErrors({ checking: false });

            return of({ usernameUnavailable: true });
          })
        );
      })
    );
  };
}
