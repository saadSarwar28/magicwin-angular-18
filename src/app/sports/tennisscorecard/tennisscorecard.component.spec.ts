import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisscorecardComponent } from './tennisscorecard.component';

describe('TennisscorecardComponent', () => {
  let component: TennisscorecardComponent;
  let fixture: ComponentFixture<TennisscorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisscorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisscorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
