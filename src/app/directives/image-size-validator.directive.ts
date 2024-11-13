import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appImageSizeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ImageSizeValidatorDirective,
      multi: true
    }
  ]
})
export class ImageSizeValidatorDirective implements Validator {
  @Input() appImageSizeValidator!: number; // Maximum image size in bytes

  validate(control: AbstractControl): ValidationErrors | null {
    const maxSize = this.appImageSizeValidator;
    const file = control.value as File;
    console.log("files size",file.size )
    if (!control.value) {
      return null; // Don't validate if no file is selected
    }


    if (file.size > maxSize) {

      return { imageSizeExceeded: true };
    }

    return null;
  }
}
