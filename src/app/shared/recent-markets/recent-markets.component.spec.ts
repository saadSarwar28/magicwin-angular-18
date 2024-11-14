import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentMarketsComponent } from './recent-markets.component';

describe('RecentMarketsComponent', () => {
  let component: RecentMarketsComponent;
  let fixture: ComponentFixture<RecentMarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentMarketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
