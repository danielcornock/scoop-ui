import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

import { IFormModalConfig } from './interfaces/form-modal-config.interface';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent
  extends ModalDialogInstanceComponent<IFormModalConfig, any>
  implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: IFormModalConfig,
    dialogRef: MatDialogRef<FormModalComponent>,
    private readonly _formFactory: FormFactory,
    private readonly _spinnerService: NgxSpinnerService
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.form = this._formFactory.createForm(this.data.formConfig);
  }

  public async submit(): Promise<void> {
    if (this.form.isInvalid) {
      this.form.formGroup.markAllAsTouched();
      return;
    }

    try {
      this._spinnerService.show();
      const data = await this.data.onSubmit(this.form.value);
      this.close(data);
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }
}
