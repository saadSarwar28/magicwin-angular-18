import { TestBed } from '@angular/core/testing';

import { AxiosinstanceService } from './axiosinstance.service';

describe('AxiosinstanceService', () => {
  let service: AxiosinstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxiosinstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
