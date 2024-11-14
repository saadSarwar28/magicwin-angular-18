import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacetodayscardComponent } from './racetodayscard.component';

describe('RacetodayscardComponent', () => {
  let component: RacetodayscardComponent;
  let fixture: ComponentFixture<RacetodayscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacetodayscardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RacetodayscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
