import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { FormContainer } from 'src/app/lib/form/instances/form-container/form-container';
import { FormFactory } from 'src/app/lib/form/services/form-factory/form-factory.service';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormContainer;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._createForm();
  }

  public async login(): Promise<void> {
    try {
      this.errors = null;
      const { data } = await this._httpService.post(
        'auth/login',
        this.loginForm.value
      );
      this._authService.setJwt(data.jwt);
      this._router.navigateByUrl('investments');
    } catch ({ error }) {
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
