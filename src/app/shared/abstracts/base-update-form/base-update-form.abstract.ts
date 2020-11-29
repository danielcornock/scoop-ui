import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseUpdateFormComponent<TData, TMeta>
  implements OnDestroy, OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  protected _data: TData;
  protected _meta: TMeta;
  protected _resourceDate: string;

  constructor(
    protected readonly _formFactory: FormFactory,
    protected readonly _httpService: HttpService,
    protected readonly _router: Router,
    protected readonly _spinnerService: NgxSpinnerService,
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _headerActionService: HeaderActionService,
    private readonly _resourceName: string
  ) {
    this._spinnerService.show();
  }

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
    this._spinnerService.hide();
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.isInvalid) {
      this.form.formGroup.markAllAsTouched();
      return;
    }

    try {
      this._spinnerService.show();
      await this._httpService.put(
        `${this._resourceName}/${this._resourceDate}`,
        this.form.value
      );

      this._router.navigateByUrl(this._resourceName);
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  private async _getExistingResouce(): Promise<IHttpResponse<TData, TMeta>> {
    this._resourceDate = this._activatedRoute.snapshot.paramMap.get('date');

    const response = await this._httpService.get(
      `${this._resourceName}/${this._resourceDate}`
    );

    this._data = response.data;
    this._meta = response.meta;

    return response;
  }

  protected abstract _createForm(
    res: IHttpResponse<TData, TMeta>
  ): FormContainer;
}
