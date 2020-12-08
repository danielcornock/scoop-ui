import { TestBed } from '@angular/core/testing';

import { SalaryModelService } from './salary-model.service';

describe('SalaryModelService', () => {
  let service: SalaryModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
