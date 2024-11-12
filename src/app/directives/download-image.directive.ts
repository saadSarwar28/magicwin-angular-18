import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDownloadImage]'
})
export class DownloadImageDirective {
  // @Input() downloadFileName!: string;
  @Input() imageUrl!: string;

  constructor() {}

  @HostListener('click')
  onClick() {
    if (this.imageUrl) {
      const a = document.createElement('a');
      a.href = this.imageUrl;
      // a.setAttribute('target', '_blank');
      a.download = 'image.jpg';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
