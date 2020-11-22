import { Router } from '@angular/router';
import { FormContainer } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

export abstract class BaseEntryForm {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    protected readonly _spinnerService: NgxSpinnerService,
    protected readonly _httpService: HttpService,
    protected readonly _router: Router,
    protected readonly _headerActionService: HeaderActionService,
    protected readonly _resourceName: string
  ) {
    this._spinnerService.show();
  }

  protected async onInit(): Promise<void> {
    this._headerActionService.setAction({
      label: 'Save',
      action: this.submitForm.bind(this)
    });
    this.form = this._createForm();
    this._spinnerService.hide();
  }

  protected onDestroy(): void {
    this._headerActionService.setAction(undefined);
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.formGroup.invalid) {
      this.form.formGroup.markAllAsTouched();
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
