import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  public canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigateByUrl('login');
      return false;
    } else {
      return true;
    }
  }
}
