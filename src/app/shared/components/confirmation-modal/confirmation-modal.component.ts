import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

import { IConfirmationModalData } from '../../services/modal/interfaces/confirmation-modal-config.interface';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent extends ModalDialogInstanceComponent<
  IConfirmationModalData,
  boolean
> {
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {
    super(dialogRef, data);
  }

  public accept(): void {
    this.close(true);
  }

  public deny(): void {
    this.close(false);
  }
}
