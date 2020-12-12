import { TestBed } from '@angular/core/testing';

import { FormDirtyCheckService } from './form-dirty-check.service';

describe('DirtyCheckService', () => {
  let service: FormDirtyCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDirtyCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
