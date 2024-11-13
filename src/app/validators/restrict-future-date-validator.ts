import { formatDate } from '@angular/common';
import { AbstractControl } from '@angular/forms';
export function futureDateRestictedValidator(control: AbstractControl) {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  let today = formatDate(new Date().toUTCString(),'yyyy-MM-ddTHH:mm','en');
  if (selectedDate > currentDate) {
    control.setValue(today);
  }
  return null;
}
