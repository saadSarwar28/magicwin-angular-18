import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakerDataComponent } from './bookmaker-data.component';

describe('BookmakerDataComponent', () => {
  let component: BookmakerDataComponent;
  let fixture: ComponentFixture<BookmakerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmakerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmakerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
