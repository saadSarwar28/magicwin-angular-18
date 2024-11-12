import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePopupComponent } from './game-popup.component';

describe('GamePopupComponent', () => {
  let component: GamePopupComponent;
  let fixture: ComponentFixture<GamePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
