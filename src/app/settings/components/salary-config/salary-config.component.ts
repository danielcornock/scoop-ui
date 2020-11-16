import { Component, Input, OnInit } from '@angular/core';
import { forEach } from 'lodash';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { STUDENT_LOAN_TYPE } from 'src/app/salary/constants/student-loan-type.enum';

import { ISettings } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-salary-config',
  templateUrl: './salary-config.component.html',
  styleUrls: ['./salary-config.component.scss']
})
export class SalaryConfigComponent implements OnInit {
  @Input()
  public salaryConfigSettings: ISettings;

  public form: FormContainer;
  public isExpanded: boolean;

  constructor(private readonly _formFactory: FormFactory) {}

  ngOnInit(): void {
    this._createForm();
    this._listenToFormChanges();
  }

  public expandSettings(): void {
    this.isExpanded = !this.isExpanded;
  }

  private _createForm(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'salaryYearlySalary',
        label: 'Annual salary',
        type: FormInputType.NUMBER,
        defaultValue: this.salaryConfigSettings.salaryYearlySalary
      },
      {
        name: 'salaryStudentFinance',
        label: 'Student finance plan',
        type: FormInputType.RADIO,
        defaultValue: this.salaryConfigSettings.salaryStudentFinance,
        options: [
          { value: null, label: 'None' },
          { value: STUDENT_LOAN_TYPE.Pre2012, label: 'Pre 2012' },
          { value: STUDENT_LOAN_TYPE.Post2012, label: '2012 and after' }
        ]
      },
      {
        name: 'salaryPensionContribution',
        label: 'Monthly pension contribution (%)',
        type: FormInputType.NUMBER,
        defaultValue: this.salaryConfigSettings.salaryPensionContribution
      }
    ]);
  }

  private _listenToFormChanges(): void {
    this.form.formGroup.valueChanges.subscribe((formValue) => {
      forEach(formValue, (value: unknown, key: string) => {
        this.salaryConfigSettings[key] = value;
      });
    });
  }
}
