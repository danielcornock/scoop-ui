import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

import { IContextMenuItem } from '../context-menu/interfaces/context-menu-item.interface';

@Component({
  selector: 'app-log-actions-modal',
  templateUrl: './log-actions-modal.component.html',
  styleUrls: ['./log-actions-modal.component.scss']
})
export class LogActionsModalComponent extends ModalDialogInstanceComponent<
  IContextMenuItem[],
  void
> {
  constructor(
    @Inject(MAT_DIALOG_DATA) data: Array<IContextMenuItem>,
    dialogRef: MatDialogRef<LogActionsModalComponent>
  ) {
    super(dialogRef, data);
  }

  public async action(action: () => Promise<void>): Promise<void> {
    await action();
    this.close();
  }
}
