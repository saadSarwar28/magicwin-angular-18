import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybetsModalComponent } from './mybets-modal.component';

describe('MybetsModalComponent', () => {
  let component: MybetsModalComponent;
  let fixture: ComponentFixture<MybetsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybetsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MybetsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
