import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError, startWith } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';

export function phoneAvailabilityValidator(
  backendService: BackendService,
  recaptchaV3Service: ReCaptchaV3Service
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // return null if no username is entered
    }

    const countryCode = control.parent?.controls['countryCode'].value;
    if (control.value.length <= 7) {
      return of(null);
    }
    control.setErrors({ checking: true });
    return control.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after the last keystroke before checking
      switchMap((value) => {
        return recaptchaV3Service.execute('importantAction').pipe(
          switchMap((recaptcha) => {
            const checkUserNameModel = { username: value, recaptcha, countryCode }; // adjust as needed
            return backendService.CheckUserPhone('PHONE', checkUserNameModel);
          }),
          map((response) => {
            control.setErrors({ checking: false });
            if (response.status) {
              if (response.otpRequired) {
                control.parent?.controls['OTP'].setValue("");
                control.parent?.controls['OTP'].setErrors({ otpRequired: true });
                control.setErrors(null);
                return null; //
              } else {
                control.setErrors(null);
                control.parent?.controls['OTP'].setErrors(null);
                control.parent?.controls['OTP'].setValue("3366");
                return null; //
              }
            } else {
              control.setErrors({ phoneNumberTaken: true }) // phoneNumberTaken is taken);
              control.parent?.controls['OTP'].setErrors(null);
              control.parent?.controls['OTP'].setValue("3366");
              return { phoneNumberTaken: true }; // Username is taken
            }

          }),
          catchError(() => of({ usernameUnavailable: true }))
        );
      })
    );
  };
}
