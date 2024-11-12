import { TestBed } from '@angular/core/testing';

import { DepositMethodService } from './deposit-method.service';

describe('DepositMethodService', () => {
  let service: DepositMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
