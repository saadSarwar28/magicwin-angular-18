import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithDrawComponent } from './with-draw.component';

describe('WithDrawComponent', () => {
  let component: WithDrawComponent;
  let fixture: ComponentFixture<WithDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithDrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
