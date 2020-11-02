import { Component, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormContainer;
  public errors: IHttpError;
  public isDevelopment: boolean;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isDevelopment = isDevMode();
    /* In case the user is redirected here when authorisation fails */
    this._spinnerService.hide();

    if (this._authService.isAuthenticated()) {
      this._router.navigateByUrl('net-worth');
    }

    this._createForm();
  }

  public async login(): Promise<void> {
    if (this.loginForm.isInvalid) {
      return;
    }

    try {
      this._spinnerService.show();
      this.errors = null;
      const { data } = await this._httpService.post(
        'auth/login',
        this.loginForm.value
      );
      this._authService.setJwt(data.jwt);
      this._router.navigate(['net-worth']);
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  private _createForm(): void {
    this.loginForm = this._formFactory.createForm([
      {
        name: 'email',
        label: 'Email address',
        validators: {
          required: true,
          email: true
        }
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        validators: {
          required: true
        }
      }
    ]);
  }
}
