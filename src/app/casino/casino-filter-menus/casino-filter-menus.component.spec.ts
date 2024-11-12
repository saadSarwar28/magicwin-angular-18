import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoFilterMenusComponent } from './casino-filter-menus.component';

describe('CasinoFilterMenusComponent', () => {
  let component: CasinoFilterMenusComponent;
  let fixture: ComponentFixture<CasinoFilterMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoFilterMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoFilterMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
