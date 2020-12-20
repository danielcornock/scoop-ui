import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { autoMock } from 'jasmine-automock';
import { of } from 'rxjs';

import { API_URL } from '../../providers/http.providers';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService,
    dependencies: {
      httpClient: jasmine.SpyObj<HttpClient>;
    };

  beforeEach(() => {
    dependencies = {
      httpClient: autoMock(HttpClient)
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: dependencies.httpClient },
        {
          provide: API_URL,
          useValue: 'baseurl/'
        }
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    let result: any;

    beforeEach(() => {
      dependencies.httpClient.get.and.returnValue(of('httpResponse'));
      result = service.get('url');
    });

    it('should fetch the data', () => {
      expect(dependencies.httpClient.get).toHaveBeenCalledWith('baseurl/url');
    });

    it('should return the value', async () => {
      expect(await result).toBe('httpResponse');
    });
  });
});
