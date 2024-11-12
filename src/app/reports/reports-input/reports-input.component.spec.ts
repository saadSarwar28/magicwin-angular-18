import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInputComponent } from './reports-input.component';

describe('ReportsInputComponent', () => {
  let component: ReportsInputComponent;
  let fixture: ComponentFixture<ReportsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
