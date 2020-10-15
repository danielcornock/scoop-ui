import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly _authService: AuthService) {}

  public isLoggedIn(): boolean {
    return this._authService.isAuthenticated();
  }
}
