import { Component, OnInit } from '@angular/core';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  public form: FormContainer;
  public emailSent: boolean;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'email',
        label: 'Email',
        validators: {
          required: true
        }
      }
    ]);
  }

  public async resetPassword(): Promise<void> {
    try {
      this._spinnerService.show();
      await this._httpService.post('auth/forgotPassword', this.form.value);
      this.emailSent = true;
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }
}
