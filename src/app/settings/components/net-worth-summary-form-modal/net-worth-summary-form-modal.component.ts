import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

import { INetWorthSummaryItemConfig } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-net-worth-summary-form-modal',
  templateUrl: './net-worth-summary-form-modal.component.html',
  styleUrls: ['./net-worth-summary-form-modal.component.scss']
})
export class NetWorthSummaryFormModalComponent
  extends ModalDialogInstanceComponent<string[], INetWorthSummaryItemConfig>
  implements OnInit {
  public form: FormContainer;
  public availableFields: Array<string>;

  private _selectedIcon: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: string[],
    dialogRef: MatDialogRef<NetWorthSummaryFormModalComponent>,
    private readonly _formFactory: FormFactory
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.availableFields = this.data;
    this.form = this._formFactory.createForm([
      {
        name: 'label',
        label: 'Label',
        validators: {
          required: true
        }
      },
      {
        name: 'sumOf',
        label: 'Combined Fields',
        validators: {
          required: true
        }
      }
    ]);
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
