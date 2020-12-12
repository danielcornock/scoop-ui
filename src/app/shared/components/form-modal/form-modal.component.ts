import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

import { ModalService } from '../../services/modal/modal.service';
import { IFormModalConfig } from './interfaces/form-modal-config.interface';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent
  extends ModalDialogInstanceComponent<IFormModalConfig, any>
  implements OnInit, OnDestroy {
  public form: FormContainer;
  public errors: IHttpError;

  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: IFormModalConfig,
    dialogRef: MatDialogRef<FormModalComponent>,
    private readonly _formFactory: FormFactory,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _modalService: ModalService
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this.form = this._formFactory.createForm(this.data.formConfig);
    this._setBeforeClose();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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

  public async closeWithoutSaving(): Promise<void> {
    if (this.form.formGroup.dirty) {
      this._openConfirmationModal();
    } else {
      this.close();
    }
  }

  private _setBeforeClose(): void {
    this._dialogRef.disableClose = true;
    this._dialogRef
      .backdropClick()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.closeWithoutSaving();
      });
  }

  private _openConfirmationModal(): Promise<boolean> {
    return this._modalService.openConfirmationModal({
      prompt: 'You may have unsaved changes on this form.',
      details:
        'Are you sure you want to close this modal? Any changes will be discarded.',
      onConfirm: () => this.close(),
      icon: 'edit-2'
    });
  }
}
