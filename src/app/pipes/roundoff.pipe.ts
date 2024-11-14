import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundoff',
  standalone: true,
})
export class RoundoffPipe implements PipeTransform {

  transform(value: any): any {
    if (isNaN(value)) {
      return;
    }
    const roundedValue = Math.round(value);
    if (value - roundedValue >= 0.5) {
      return Math.ceil(value);
    } else {
      return roundedValue;
    }
  }

}
