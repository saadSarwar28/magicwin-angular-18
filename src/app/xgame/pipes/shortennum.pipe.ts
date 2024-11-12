import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortennum'
})
export class ShortennumPipe implements PipeTransform {

  transform(num: number): string {
    let units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
    decimal;

  for (var i = units.length - 1; i >= 0; i--) {
      decimal = Math.pow(1000, i + 1);

      if (num <= -decimal || num >= decimal) {
          return +(num / decimal).toFixed(2) + units[i];
      }
  }
  if (num === 0) {
  return "0";

    }

  if(num && !isNaN(num)){
    return num.toString();
  }else{
    return "0";
  }
  }

}
