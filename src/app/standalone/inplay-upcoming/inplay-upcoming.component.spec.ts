import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplayUpcomingComponent } from './inplay-upcoming.component';

describe('InplayUpcomingComponent', () => {
  let component: InplayUpcomingComponent;
  let fixture: ComponentFixture<InplayUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InplayUpcomingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InplayUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
