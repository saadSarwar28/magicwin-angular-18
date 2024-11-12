import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appDisableAutofill]'
})
export class DisableAutofillDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // Set autocomplete attribute to off
    this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', 'off');
    this.renderer.setAttribute(this.el.nativeElement, 'autocorrect', 'off');
    this.renderer.setAttribute(this.el.nativeElement, 'autocapitalize', 'off');
    this.renderer.setAttribute(this.el.nativeElement, 'spellcheck', 'false');
    console.log("sssss")
  }
}
