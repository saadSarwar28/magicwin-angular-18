import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseTime'
})
export class ReverseTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: string = String(Math.floor(value / 60)).padStart(2, '0');
    const seconds: string = String(value % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}