import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSort',
})
export class DateSortPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    // Sort the array based on the uploadDate property
    return array.sort((a, b) => {
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);

      return   dateB.getTime() - dateA.getTime();
    });
  }
}
