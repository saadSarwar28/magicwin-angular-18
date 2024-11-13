import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMarketsComponent } from './line-markets.component';

describe('LineMarketsComponent', () => {
  let component: LineMarketsComponent;
  let fixture: ComponentFixture<LineMarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMarketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
