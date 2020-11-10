import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;
  public isSubmitted: boolean;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigateByUrl('net-worth');
    }

    this._createForm();
  }

  public async login(): Promise<void> {
    if (this.form.isInvalid) {
      return;
    }

    try {
      this._spinnerService.show();
      this.errors = null;
      await this._httpService.post('auth/register', this.form.value);
      this.isSubmitted = true;
      this._spinnerService.hide();
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  private _createForm(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'name',
        label: 'Name',
        validators: {
          required: true
        }
      },
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
        type: FormInputType.PASSWORD,
        label: 'Password',
        validators: {
          required: true
        }
      }
    ]);
  }
}
