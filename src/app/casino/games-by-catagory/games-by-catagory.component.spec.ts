import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesByCatagoryComponent } from './games-by-catagory.component';

describe('GamesByCatagoryComponent', () => {
  let component: GamesByCatagoryComponent;
  let fixture: ComponentFixture<GamesByCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesByCatagoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesByCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
