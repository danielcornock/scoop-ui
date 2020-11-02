import { Component, OnInit } from '@angular/core';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public form: FormContainer;
  public passwordChanged: boolean;
  public errors: IHttpError;
  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _authService: AuthService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'oldPassword',
        label: 'Old password',
        type: 'password',
        validators: {
          required: true
        }
      },
      {
        name: 'newPassword',
        label: 'New Password',
        type: 'password',
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
