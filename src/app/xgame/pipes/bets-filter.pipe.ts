import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marketNameFilter'
})
export class BetsFilterPipe implements PipeTransform {
  transform(items: any[], filterKeywords: string[]): any[] {
    if (!items || !filterKeywords || filterKeywords.length === 0) {
      return items;
    }

    return items.filter(item => {
      const lowerCaseMarketName = item.fullMarketName.toLowerCase();
      return filterKeywords.some(keyword => lowerCaseMarketName.includes(keyword.toLowerCase()));
    });
  }
}
