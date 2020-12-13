import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';
import { FormPage } from 'src/app/core/services/form-dirty-check/form-dirty-check.service';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseEntryFormComponent<
  TModel extends IHttpResponse<any>,
  TStore extends BaseLogStore<any, TModel> = BaseLogStore<any, TModel>
> implements OnDestroy, OnInit, FormPage {
  public form: FormContainer;
  public errors: IHttpError;
  public dirty$: Observable<boolean>;

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
    this.dirty$ = this.form.formGroup.valueChanges.pipe(
      startWith(this.form.value),
      switchMap(() => of(this.form.formGroup.dirty))
    );
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
      this.form.formGroup.reset();
      this._router.navigateByUrl(this._resourceName);
    } catch ({ error }) {
      this.errors = error;
    }
  }

  protected abstract _createForm(): FormContainer;
}
