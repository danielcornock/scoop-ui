import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { noop } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _popupService: PopupService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(noop, (error) => {
        this._spinnerService.hide();
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this._popupService.showApiError(error.error);

          this._authService.removeJwt();
          this._router.navigateByUrl('login');
        }
      })
    );
  }
}
