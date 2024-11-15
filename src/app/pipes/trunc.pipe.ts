import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trunc' })
export class TruncPipe implements PipeTransform {
  transform(value: number): number {
    if (value) {
      return Math.trunc(value);
    }
    return value
  }
}
