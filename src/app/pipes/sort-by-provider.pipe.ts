import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByProvider'
})
export class SortByProviderPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    // Separate data based on PROVIDER values
    const evoData = array.filter(item => item.PROVIDERS === 'EVO');
    const ezData = array.filter(item => item.PROVIDERS === 'EZ');
    const icData = array.filter(item => item.PROVIDERS === 'IC');
    const otherData = array.filter(item => item.PROVIDERS !== 'EVO' && item.PROVIDERS !== 'EZ' && item.PROVIDERS !== 'IC');

    // Concatenate data arrays in the desired order
    return [...evoData, ...ezData, ...icData, ...otherData];
  }
}
