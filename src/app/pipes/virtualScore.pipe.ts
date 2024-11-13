import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'vScore' })
export class VirtualScorePipe implements PipeTransform {

  transform(m: any, index: number): string {
    console.log("m", m, index)
    if (m?.score) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(m.score, 'text/html');
      const spanElements = doc.querySelectorAll('span');
      const spanValue = spanElements[index]?.textContent;
      return spanValue ? spanValue : '';
    }
    return '';
  }
}
