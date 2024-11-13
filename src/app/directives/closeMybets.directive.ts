import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { UtillsService } from '../services/utills.service';
@Directive({
  selector: '[clickOutsideMyBets]'
})
export class clickOutsideMyBetsDirective {
  constructor(private elementRef: ElementRef, private utillsService: UtillsService,) { }
  @Output() clickOutside = new EventEmitter<void>();
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const isModal = targetElement.classList.contains('mybets-modal-container');
    if (!clickedInside && !isModal) {
      this.clickOutside.emit();
      this.utillsService.openBetModal.next(true)
    }
  }
}
