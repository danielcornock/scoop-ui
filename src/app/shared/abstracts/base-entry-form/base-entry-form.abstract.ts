import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseEntryFormComponent<
  TModel extends IHttpResponse<any>,
  TStore extends BaseLogStore<any, TModel> = BaseLogStore<any, TModel>
> implements OnDestroy, OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    protected readonly _spinnerService: NgxSpinnerService,
    protected readonly _store: TStore,
    protected readonly _router: Router,
    protected readonly _headerActionService: HeaderActionService,
    protected readonly _resourceName: string
  ) {
    this._spinnerService.show();
  }

  public ngOnDestroy(): void {
    this._headerActionService.setAction(undefined);
  }

  public ngOnInit(): void {
    this._headerActionService.setAction({
      label: 'Save',
      action: this.submitForm.bind(this)
    });
    this.form = this._createForm();
    this._spinnerService.hide();
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.isInvalid) {
      this.form.formGroup.markAllAsTouched();
      return;
    }

    try {
      await this._store.create(this.form.value);

      this._router.navigateByUrl(this._resourceName);
    } catch ({ error }) {
      this.errors = error;
    }
  }

  protected abstract _createForm(): FormContainer;
}
