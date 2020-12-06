import { TestBed } from '@angular/core/testing';

import { NetWorthModelService } from './net-worth-model.service';

describe('NetWorthModelService', () => {
  let service: NetWorthModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetWorthModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
