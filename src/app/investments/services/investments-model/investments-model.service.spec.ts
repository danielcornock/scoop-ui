import { TestBed } from '@angular/core/testing';

import { InvestmentsModelService } from './investments-model.service';

describe('InvestmentsModelService', () => {
  let service: InvestmentsModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentsModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
