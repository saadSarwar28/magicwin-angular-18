import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventmarketsComponent} from './eventmarkets.component';

describe('EventmarketsComponent', () => {
  let component: EventmarketsComponent;
  let fixture: ComponentFixture<EventmarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventmarketsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
