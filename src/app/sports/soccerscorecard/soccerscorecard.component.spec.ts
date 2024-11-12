import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerscorecardComponent } from './soccerscorecard.component';

describe('SoccerscorecardComponent', () => {
  let component: SoccerscorecardComponent;
  let fixture: ComponentFixture<SoccerscorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoccerscorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerscorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
