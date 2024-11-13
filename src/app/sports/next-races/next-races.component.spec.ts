import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextRacesComponent } from './next-races.component';

describe('NextRacesComponent', () => {
  let component: NextRacesComponent;
  let fixture: ComponentFixture<NextRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextRacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
