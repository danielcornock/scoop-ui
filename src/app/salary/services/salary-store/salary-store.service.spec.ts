import { TestBed } from '@angular/core/testing';

import { SalaryStoreService } from './salary-store.service';

describe('SalaryStoreService', () => {
  let service: SalaryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
