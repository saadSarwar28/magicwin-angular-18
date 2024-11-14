import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenusComponent } from './nav-menus.component';

describe('NavMenusComponent', () => {
  let component: NavMenusComponent;
  let fixture: ComponentFixture<NavMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
