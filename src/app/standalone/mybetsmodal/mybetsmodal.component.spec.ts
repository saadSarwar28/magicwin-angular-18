import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybetsmodalComponent } from './mybetsmodal.component';

describe('MybetsmodalComponent', () => {
  let component: MybetsmodalComponent;
  let fixture: ComponentFixture<MybetsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybetsmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MybetsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
