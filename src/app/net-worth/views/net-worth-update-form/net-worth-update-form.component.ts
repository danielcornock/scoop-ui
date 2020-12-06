import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { capitalize } from 'lodash';
import { FormContainer, FormFactory, FormInputType, IFormFactoryConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BaseUpdateFormComponent } from 'src/app/shared/abstracts/base-update-form/base-update-form.abstract';

import { INetWorthData, INetWorthMeta } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-update-form',
  templateUrl: '../net-worth-entry-form/net-worth-entry-form.component.html',
  styleUrls: ['../net-worth-entry-form/net-worth-entry-form.component.scss']
})
export class NetWorthUpdateFormComponent
  extends BaseUpdateFormComponent<INetWorthData, INetWorthMeta>
  implements OnInit, OnDestroy {
  public formFields: Array<FormControl>;

  constructor(
    formFactory: FormFactory,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService,
    activatedRoute: ActivatedRoute,
    headerActionService: HeaderActionService
  ) {
    super(
      formFactory,
      httpService,
      router,
      spinnerService,
      activatedRoute,
      headerActionService,
      'net-worth'
    );
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }

  protected _createForm({ data }): FormContainer {
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Month',
        type: FormInputType.MONTH,
        defaultValue: this._resourceDate,
        disabled: true,
        validators: {
          required: true
        }
      },
      ...this._meta.fields.map((fieldName: string) => {
        return {
          name: fieldName,
          label: capitalize(fieldName),
          type: FormInputType.NUMBER,
          defaultValue: data.customValues[fieldName]
        };
      })
    ];

    return this._formFactory.createForm(formConfig);
  }
}
