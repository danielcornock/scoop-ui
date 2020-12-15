import { Injectable } from '@angular/core';
import { startCase } from 'lodash';
import { FormInputType, IFormFactoryConfig } from 'ngx-form-trooper';

@Injectable({
  providedIn: 'root'
})
export class NetWorthGoalsFormService {
  public createConfig(goalsFields: Array<string>): IFormFactoryConfig {
    return [
      {
        name: 'title',
        label: 'Name your goal',
        type: FormInputType.TEXT,
        validators: {
          required: true
        }
      },
      {
        name: 'target',
        label: 'Target amount',
        type: FormInputType.NUMBER,
        validators: {
          required: true,
          min: 0
        }
      },
      {
        name: 'fields',
        label: 'What items should this include?',
        type: FormInputType.MUTLI_SELECT,
        validators: {
          required: true,
          minLength: 1
        },
        options: goalsFields.map((field) => ({
          label: startCase(field),
          value: field
        }))
      },
      {
        name: 'goalType',
        label: 'What type of goal would you like to set?',
        type: FormInputType.RADIO,
        validators: {
          required: true
        },
        options: [
          { label: 'All time (maintain existing progress)', value: '0' },
          { label: 'Starting from now', value: 'now' }
        ]
      },
      {
        name: 'endDate',
        label: 'When do you want to reach your goal? (optional)',
        type: FormInputType.DATE
      }
    ];
  }
}
