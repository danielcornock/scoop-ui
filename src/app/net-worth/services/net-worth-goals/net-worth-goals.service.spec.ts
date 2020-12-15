import { TestBed } from '@angular/core/testing';

import { NetWorthGoalsService } from './net-worth-goals.service';

describe('NetWorthGoalsService', () => {
  let service: NetWorthGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetWorthGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
