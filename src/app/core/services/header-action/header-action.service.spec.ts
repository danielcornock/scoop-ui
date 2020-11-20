import { TestBed } from '@angular/core/testing';

import { HeaderActionService } from './header-action.service';

describe('HeaderActionService', () => {
  let service: HeaderActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
