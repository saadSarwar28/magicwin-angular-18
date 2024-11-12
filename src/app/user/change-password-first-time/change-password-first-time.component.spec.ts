import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFirstTimeComponent } from './change-password-first-time.component';

describe('ChangePasswordFirstTimeComponent', () => {
  let component: ChangePasswordFirstTimeComponent;
  let fixture: ComponentFixture<ChangePasswordFirstTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordFirstTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordFirstTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
