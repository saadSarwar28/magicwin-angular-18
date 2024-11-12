import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderbyPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {

    if (propertyName) {
      value.sort((a: any, b: any) => {
        if( a[propertyName]== 3 && b[propertyName] == 2)
          return -1
        else if(a[propertyName]== 1 && b[propertyName] == 2)
          return -1
        else if(a[propertyName]==1 && b[propertyName] == 3)
          return -1
        else
          return 0

        // if(b[propertyName]==1 && ) {
        //   return 1
        // }else if(b[propertyName]==3) {
        //   return 0
        // } else {
        //   return -1
        // }
      });
      return value
    }
    else
      return value;

  }

}
