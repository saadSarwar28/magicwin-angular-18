import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymarketsComponent } from './mymarkets.component';

describe('MymarketsComponent', () => {
  let component: MymarketsComponent;
  let fixture: ComponentFixture<MymarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymarketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MymarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
