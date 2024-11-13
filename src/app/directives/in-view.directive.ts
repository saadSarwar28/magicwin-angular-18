import { Directive, ElementRef, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements OnDestroy, AfterViewInit {
  @Output() visible = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.visible.emit(entry.isIntersecting);
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
