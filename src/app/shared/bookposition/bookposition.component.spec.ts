/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookpositionComponent } from './bookposition.component';

describe('BookpositionComponent', () => {
  let component: BookpositionComponent;
  let fixture: ComponentFixture<BookpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
