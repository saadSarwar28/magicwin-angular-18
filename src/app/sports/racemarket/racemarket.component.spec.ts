import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacemarketComponent } from './racemarket.component';

describe('RacemarketComponent', () => {
  let component: RacemarketComponent;
  let fixture: ComponentFixture<RacemarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacemarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacemarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
