import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-net-worth-entry-form',
  templateUrl: './net-worth-entry-form.component.html',
  styleUrls: ['./net-worth-entry-form.component.scss']
})
export class NetWorthEntryFormComponent implements OnInit {
  public form: FormGroup;
  public columns: Array<string>;
  public formFields: Array<FormControl>;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _currentDateService: DateService
  ) {}

  ngOnInit(): void {
    this.columns = ['ISA', 'Santander'];
    this._createForm();
  }

  private _createForm(): void {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();

    const formConfig = {
      date: this._formBuilder.control(currentDate)
    };

    this.columns.forEach((colName: string) => {
      formConfig[colName] = this._formBuilder.control('');
    });

    this.form = this._formBuilder.group(formConfig);
  }
}
