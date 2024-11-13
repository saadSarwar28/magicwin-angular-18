import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepinmodalComponent } from './changepinmodal.component';

describe('ChangepinmodalComponent', () => {
  let component: ChangepinmodalComponent;
  let fixture: ComponentFixture<ChangepinmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepinmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepinmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
