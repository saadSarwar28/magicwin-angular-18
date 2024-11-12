import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneClickBetComponent } from './one-click-bet.component';

describe('OneClickBetComponent', () => {
  let component: OneClickBetComponent;
  let fixture: ComponentFixture<OneClickBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneClickBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneClickBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
