import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCasinoComponent } from './fav-casino.component';

describe('FavCasinoComponent', () => {
  let component: FavCasinoComponent;
  let fixture: ComponentFixture<FavCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavCasinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
