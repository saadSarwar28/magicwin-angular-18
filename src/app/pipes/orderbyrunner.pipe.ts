import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderbyrunner'
})
export class OrderbyrunnerPipe implements PipeTransform {

  transform(array: any, field: string): any[] {

    array?.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
