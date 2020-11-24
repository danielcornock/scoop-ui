import { TestBed } from '@angular/core/testing';

import { NetWorthHttpService } from './net-worth-http.service';

describe('NetWorthHttpService', () => {
  let service: NetWorthHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetWorthHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
