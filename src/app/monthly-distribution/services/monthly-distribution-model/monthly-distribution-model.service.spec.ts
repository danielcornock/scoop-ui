import { TestBed } from '@angular/core/testing';

import { MonthlyDistributionModelService } from './monthly-distribution-model.service';

describe('MonthlyDistributionModelService', () => {
  let service: MonthlyDistributionModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyDistributionModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
