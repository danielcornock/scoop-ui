import { Router } from '@angular/router';
import { FormContainer } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

export abstract class BaseEntryForm {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _resourceName: string
  ) {
    this._spinnerService.show();
  }

  protected async onInit(): Promise<void> {
    this.form = this._createForm();
    this._spinnerService.hide();
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.formGroup.invalid) {
      return;
    }

    try {
      this._spinnerService.show();
      await this._httpService.post(this._resourceName, this.form.value);

      this._router.navigateByUrl(this._resourceName);
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  protected abstract _createForm(): FormContainer;
}
