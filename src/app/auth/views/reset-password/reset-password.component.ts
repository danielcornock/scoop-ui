import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormContainer;
  public passwordSuccessfullyReset: boolean;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'password',
        label: 'New password',
        type: 'password',
        validators: {
          required: true
        }
      }
    ]);
  }

  public async submitForm(): Promise<void> {
    try {
      this._spinnerService.show();
      const token: string = this._activatedRoute.snapshot.paramMap.get('token');
      await this._httpService.post('auth/resetPassword', {
        token,
        password: this.form.value.password
      });
      this.passwordSuccessfullyReset = true;
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }
}
