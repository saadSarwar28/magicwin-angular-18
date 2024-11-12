import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballscorecardComponent } from './basketballscorecard.component';

describe('BasketballscorecardComponent', () => {
  let component: BasketballscorecardComponent;
  let fixture: ComponentFixture<BasketballscorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketballscorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballscorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
