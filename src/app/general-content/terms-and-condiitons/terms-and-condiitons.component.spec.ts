import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndCondiitonsComponent } from './terms-and-condiitons.component';

describe('TermsAndCondiitonsComponent', () => {
  let component: TermsAndCondiitonsComponent;
  let fixture: ComponentFixture<TermsAndCondiitonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndCondiitonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndCondiitonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
