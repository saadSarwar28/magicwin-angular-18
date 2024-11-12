import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XgameCardsComponent } from './xgame-cards.component';

describe('XgameCardsComponent', () => {
  let component: XgameCardsComponent;
  let fixture: ComponentFixture<XgameCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XgameCardsComponent]
    });
    fixture = TestBed.createComponent(XgameCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
