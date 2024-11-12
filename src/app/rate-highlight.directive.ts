import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRateHighlight]'
})
export class RateHighlightDirective implements AfterViewInit {
  oldValue: any;
  constructor(private el: ElementRef, private renderer: Renderer2) { this.checkVals() }
  checkVals() {
    setInterval(() => {
      if (this.oldValue !== this.el.nativeElement.innerText) {
        //this.renderer.setStyle(this.el.nativeElement,'background','#fcfcba');
        this.renderer.addClass(this.el.nativeElement, 'chamak');
        this.oldValue = this.el.nativeElement.innerText;
      } else if (this.el.nativeElement.classList.value === 'chamak') {
        //this.renderer.setStyle(this.el.nativeElement,'background','transparent');
        this.renderer.removeClass(this.el.nativeElement, 'chamak');
      }
    }, 1000)
  }

  ngAfterViewInit() {

  }

}
