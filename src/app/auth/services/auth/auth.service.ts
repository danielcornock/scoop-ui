import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CacheService } from 'src/app/shared/services/cache-service/cache.service';

import { IJwt } from '../../interfaces/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly _jwtService: JwtHelperService,
    private readonly _cacheService: CacheService
  ) {}

  public isAuthenticated(): boolean {
    return !this._jwtService.isTokenExpired();
  }

  public removeJwt(): void {
    localStorage.removeItem('jwt');
    this._cacheService.clearAllCaches();
  }

  public setJwt(token: string): void {
    localStorage.setItem('jwt', token);
  }

  public getLoggedInUserEmail(): string {
    const token: IJwt = this._getDecodedJwt();

    return token.email;
  }

  public getLoggedInUserName(): string {
    const token: IJwt = this._getDecodedJwt();

    return token.name;
  }

  public isUserAdmin(): boolean {
    const token: IJwt = this._getDecodedJwt();

    return token.isAdmin;
  }

  public getFullJwt(): string | null {
    const token = this._jwtService.tokenGetter();
    return token ? `Bearer ${token}` : null;
  }

  private _getDecodedJwt(): IJwt {
    return this._jwtService.decodeToken();
  }
}
