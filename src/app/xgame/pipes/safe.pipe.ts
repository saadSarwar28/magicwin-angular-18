import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Pipe({ name: 'safe1' })
export class Safe1Pipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
