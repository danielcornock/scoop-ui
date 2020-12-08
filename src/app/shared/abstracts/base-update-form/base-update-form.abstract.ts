import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseUpdateFormComponent<
  TModel extends IHttpResponse,
  TData,
  TMeta
> implements OnDestroy, OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  protected _data: TData;
  protected _meta: TMeta;
  protected _resourceDate: string;

  constructor(
    protected readonly _formFactory: FormFactory,
    protected readonly _store: BaseLogStore<any, TModel>,
    protected readonly _router: Router,
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _headerActionService: HeaderActionService,
    protected readonly _resourceName: string
  ) {}

  public ngOnDestroy(): void {
    this._headerActionService.setAction(undefined);
  }

  public async ngOnInit(): Promise<void> {
    this._headerActionService.setAction({
      label: 'Save',
      action: this.submitForm.bind(this)
    });
    const response = await this._getExistingResouce();
    this.form = this._createForm(response);
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.isInvalid) {
      this.form.formGroup.markAllAsTouched();
      return;
    }

    try {
      await this._store.update(this._resourceDate, this.form.value);
      this._router.navigateByUrl(this._resourceName);
    } catch ({ error }) {
      this.errors = error;
    }
  }

  protected async _getExistingResouce(): Promise<TModel> {
    this._resourceDate = this._activatedRoute.snapshot.paramMap.get('date');

    const response = await this._store.getOne(this._resourceDate);

    this._data = response.data;
    this._meta = response.meta;

    return response;
  }

  protected abstract _createForm(res: IHttpResponse): FormContainer;
}
