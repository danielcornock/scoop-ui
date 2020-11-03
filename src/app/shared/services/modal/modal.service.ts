import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';
import { IConfirmationModalConfig, IConfirmationModalData } from './interfaces/confirmation-modal-config.interface';
import { IModalConfig } from './interfaces/modal-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private readonly _matDialog: MatDialog) {}

  public open<TData = any, TReturn = any>(
    component: Type<any>,
    config: IModalConfig<TData>
  ): Promise<TReturn> {
    return this._matDialog
      .open(component, {
        data: config.data
      })
      .afterClosed()
      .toPromise();
  }

  public async openConfirmationModal(
    config: IConfirmationModalConfig
  ): Promise<void> {
    const confirmed: boolean = await this.open<IConfirmationModalData, boolean>(
      ConfirmationModalComponent,
      {
        data: {
          prompt: config.prompt,
          details: config.details
        }
      }
    );

    if (confirmed) {
      config.onConfirm();
    }
  }
}
