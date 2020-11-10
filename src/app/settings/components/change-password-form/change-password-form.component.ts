import { Component, OnInit } from '@angular/core';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;
  public passwordChanged: boolean;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'oldPassword',
        label: 'Old password',
        type: FormInputType.PASSWORD,
        validators: {
          required: true
        }
      },
      {
        name: 'newPassword',
        label: 'New Password',
        type: FormInputType.PASSWORD,
        validators: {
          required: true
        }
      }
    ]);
  }

  public async submitPasswordChange(): Promise<void> {
    try {
      this._spinnerService.show();
      const { data } = await this._httpService.post(
        'auth/changePassword',
        this.form.value
      );
      this._authService.setJwt(data.jwt);
      this.passwordChanged = true;
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }
}
