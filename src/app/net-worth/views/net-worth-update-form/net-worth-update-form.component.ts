import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { capitalize } from 'lodash';
import { FormContainer, FormFactory, FormInputType, IFormFactoryConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-update-form',
  templateUrl: '../net-worth-entry-form/net-worth-entry-form.component.html',
  styleUrls: ['../net-worth-entry-form/net-worth-entry-form.component.scss']
})
export class NetWorthUpdateFormComponent implements OnInit {
  public form: FormContainer;
  public formFields: Array<FormControl>;
  public errors: IHttpError;
  public netWorthDate: string;
  public netWorth: INetWorthApiResponse;

  private _fields: Array<string>;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._getExistingNetWorth();
    this._createForm();
    this._spinnerService.hide();
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.formGroup.invalid) {
      return;
    }

    try {
      this._spinnerService.show();
      await this._httpService.put(`net-worth/${this.netWorthDate}`, {
        customValues: this.form.value
      });
      this._router.navigateByUrl('net-worth');
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  private async _getExistingNetWorth(): Promise<void> {
    this.netWorthDate = this._activatedRoute.snapshot.paramMap.get(
      'netWorthDate'
    );
    const { data, meta } = await this._httpService.get(
      `net-worth/${this.netWorthDate}`
    );
    this._fields = meta.fields;
    this.netWorth = data;
  }

  private _createForm(): void {
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Month',
        type: FormInputType.MONTH,
        defaultValue: this.netWorthDate,
        disabled: true,
        validators: {
          required: true
        }
      },
      ...this._fields.map((fieldName: string) => {
        return {
          name: fieldName,
          label: capitalize(fieldName),
          type: FormInputType.NUMBER,
          defaultValue: this.netWorth.customValues[fieldName]
        };
      })
    ];

    this.form = this._formFactory.createForm(formConfig);
  }
}
