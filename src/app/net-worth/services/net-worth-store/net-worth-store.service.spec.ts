import { TestBed } from '@angular/core/testing';

import { NetWorthStoreService } from './net-worth-store.service';

describe('NetWorthStoreService', () => {
  let service: NetWorthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetWorthStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
