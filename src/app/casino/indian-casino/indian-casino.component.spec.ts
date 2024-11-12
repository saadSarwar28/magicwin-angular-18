import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianCasinoComponent } from './indian-casino.component';

describe('IndianCasinoComponent', () => {
  let component: IndianCasinoComponent;
  let fixture: ComponentFixture<IndianCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndianCasinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndianCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
