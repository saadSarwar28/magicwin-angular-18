import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markettype'
})
export class MarkettypePipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {

    if (!items) return [];
    if (!value || value.length == 0) return items;
    let obj = items.filter(it => it.description[field].toLowerCase().indexOf(value.toLowerCase()) != -1);

    if (obj && obj.length > 0) {
      return obj;
    } else {
      return [];
    }
  }

}
