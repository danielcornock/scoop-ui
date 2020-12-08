import { TestBed } from '@angular/core/testing';

import { InvestmentsStoreService } from './investments-store.service';

describe('InvestmentsStoreService', () => {
  let service: InvestmentsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
