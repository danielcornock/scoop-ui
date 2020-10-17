import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { capitalize } from 'lodash';
import { FormContainer } from 'src/app/lib/form/instances/form-container/form-container';
import { IFormFactoryConfig } from 'src/app/lib/form/interfaces/form-factory-config.interface';
import { FormFactory } from 'src/app/lib/form/services/form-factory/form-factory.service';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-net-worth-entry-form',
  templateUrl: './net-worth-entry-form.component.html',
  styleUrls: ['./net-worth-entry-form.component.scss']
})
export class NetWorthEntryFormComponent implements OnInit {
  public form: FormContainer;
  public columns: Array<string>;
  public formFields: Array<FormControl>;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService
  ) {}

  ngOnInit(): void {
    this.columns = ['ISA', 'Santander'];
    this._createForm();
  }

  private _createForm(): void {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Month',
        type: 'month',
        defaultValue: currentDate
      }
    ];

    this.columns.forEach((colName: string) => {
      formConfig.push({
        name: colName,
        label: capitalize(colName)
      });
    });

    this.form = this._formFactory.createForm(formConfig);
  }
}
