import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamenavbarComponent} from './gamenavbar.component';

describe('GamenavbarComponent', () => {
  let component: GamenavbarComponent;
  let fixture: ComponentFixture<GamenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamenavbarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
