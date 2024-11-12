import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketscorecardComponent } from './cricketscorecard.component';

describe('CricketscorecardComponent', () => {
  let component: CricketscorecardComponent;
  let fixture: ComponentFixture<CricketscorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CricketscorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketscorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
