import { TestBed } from '@angular/core/testing';

import { NetWorthGoalsFormService } from './net-worth-goals-form.service';

describe('NetWorthGoalsFormService', () => {
  let service: NetWorthGoalsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetWorthGoalsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
