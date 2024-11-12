import { TestBed } from '@angular/core/testing';

import { NgwebsocketService } from './ngwebsocket.service';

describe('NgwebsocketService', () => {
  let service: NgwebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgwebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
