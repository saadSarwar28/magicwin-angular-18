import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyDataComponent } from './fancy-data.component';

describe('FancyDataComponent', () => {
  let component: FancyDataComponent;
  let fixture: ComponentFixture<FancyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
