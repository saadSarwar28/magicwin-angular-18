import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplayUpcomingMatchesComponent } from './inplay-upcoming-matches.component';

describe('InplayUpcomingMatchesComponent', () => {
  let component: InplayUpcomingMatchesComponent;
  let fixture: ComponentFixture<InplayUpcomingMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InplayUpcomingMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InplayUpcomingMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
