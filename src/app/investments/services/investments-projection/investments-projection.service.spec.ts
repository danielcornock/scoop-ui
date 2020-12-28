import { TestBed } from '@angular/core/testing';

import { InvestmentsProjectionService } from './investments-projection.service';

describe('InvestmentsProjectionService', () => {
  let service: InvestmentsProjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentsProjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
