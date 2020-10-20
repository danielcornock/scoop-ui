import { InjectionToken, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = new InjectionToken('API_URL');

export const httpProviders: Provider[] = [
  {
    provide: API_URL,
    useFactory: () => {
      if (environment.production) {
        return 'api/v1/';
      } else {
        return 'http://localhost:3000/api/v1/';
      }
    }
  }
];
