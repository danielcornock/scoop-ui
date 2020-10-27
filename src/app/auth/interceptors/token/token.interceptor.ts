import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this._authService.getFullJwt();

    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: jwt
        }
      });
    }

    return next.handle(request);
  }
}
