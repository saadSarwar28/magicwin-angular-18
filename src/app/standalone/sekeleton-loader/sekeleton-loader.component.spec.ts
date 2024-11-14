import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SekeletonLoaderComponent } from './sekeleton-loader.component';

describe('SekeletonLoaderComponent', () => {
  let component: SekeletonLoaderComponent;
  let fixture: ComponentFixture<SekeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SekeletonLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SekeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
