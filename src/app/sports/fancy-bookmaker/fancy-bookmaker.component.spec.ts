import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyBookmakerComponent } from './fancy-bookmaker.component';

describe('FancyBookmakerComponent', () => {
  let component: FancyBookmakerComponent;
  let fixture: ComponentFixture<FancyBookmakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancyBookmakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyBookmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
