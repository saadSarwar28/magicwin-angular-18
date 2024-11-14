import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe', standalone: true,
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Pipe(
  { name: 'safe1', standalone: true, }
)
export class Safe1Pipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({ name: 'safeHTML' })
export class SafeHTML implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Pipe({
  name: 'extractNumber',
  standalone: true
})
export class ExtractNumberPipe implements PipeTransform {

  transform(value: string): { number: number | null, text: string } {
    const numberMatch = value.match(/\d+/); // Extract number
    const textMatch = value.replace(/\d+\.?\s*/, ''); // Extract text by removing the number
    return {
      number: numberMatch ? Number(numberMatch[0]) : null,
      text: textMatch.trim()
    };
  }

}
