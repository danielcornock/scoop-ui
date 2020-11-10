import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

import { INetWorthSummaryItemConfig } from '../../interfaces/settings.interface';
import { INetWorthSummaryFormModalConfig } from './interfaces/net-worth-summary-form-modal-config.interface';

@Component({
  selector: 'app-net-worth-summary-form-modal',
  templateUrl: './net-worth-summary-form-modal.component.html',
  styleUrls: ['./net-worth-summary-form-modal.component.scss']
})
export class NetWorthSummaryFormModalComponent
  extends ModalDialogInstanceComponent<
    INetWorthSummaryFormModalConfig,
    INetWorthSummaryItemConfig
  >
  implements OnInit {
  public form: FormContainer;
  public availableFields: Array<string>;

  private _selectedIcon: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: INetWorthSummaryFormModalConfig,
    dialogRef: MatDialogRef<NetWorthSummaryFormModalComponent>,
    private readonly _formFactory: FormFactory
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.availableFields = this.data.fields;
    this.form = this._formFactory.createForm([
      {
        name: 'label',
        label: 'Label',
        defaultValue: this.data.existingData?.label,
        validators: {
          required: true
        }
      },
      {
        name: 'sumOf',
        label: 'Combined Fields',
        defaultValue: this.data.existingData?.sumOf,
        validators: {
          required: true
        }
      }
    ]);

    this.onIconSelect(this.data.existingData?.icon);
  }

  public onIconSelect(iconName: string): void {
    this._selectedIcon = iconName;
  }

  public addOption(): void {
    if (this.form.formGroup.invalid) {
      return;
    }

    this.close({
      ...this.form.value,
      icon: this._selectedIcon
    });
  }
}
