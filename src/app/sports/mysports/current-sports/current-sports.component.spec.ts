import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSportsComponent } from './current-sports.component';

describe('CurrentSportsComponent', () => {
  let component: CurrentSportsComponent;
  let fixture: ComponentFixture<CurrentSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
