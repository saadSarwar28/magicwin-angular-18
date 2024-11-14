import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFancyMarkets',
  standalone: true
})
export class FilterFancyMarketsPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {

    if (value == "ALL") {
      return items;
    }
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(it => it[field].toLowerCase() == value.toLowerCase());
  }

}
