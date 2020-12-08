import { TestBed } from '@angular/core/testing';

import { MonthlyDistributionStoreService } from './monthly-distribution-store.service';

describe('MonthlyDistributionStoreService', () => {
  let service: MonthlyDistributionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyDistributionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
