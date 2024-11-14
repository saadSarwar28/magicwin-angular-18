import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRaceByType',
  standalone: true,
})
export class PremiumRacePipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (value == "all")
      return items;
    if (!items) return [];
    if (!value || value.length == 0) return items;
    let obj = items.filter(item => item.marketName.Type === value)
    if (obj && obj.length > 0) {
      return obj;
    } else {
      return [];
    }
  }

}
