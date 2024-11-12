import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventtypeid'
})
export class EventtypeidPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if(value=="all")
    return items;
    if (!items) return [];
    if (!value || value.length == 0) return items;
    let obj = items.filter(it => it[field]==value);

    if (obj && obj.length > 0) {
      return obj;
    } else {
      return [];
    }
  }

}
