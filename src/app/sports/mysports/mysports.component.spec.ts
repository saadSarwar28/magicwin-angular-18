import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysportsComponent } from './mysports.component';

describe('MysportsComponent', () => {
  let component: MysportsComponent;
  let fixture: ComponentFixture<MysportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
