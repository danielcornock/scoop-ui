import { Router } from '@angular/router';

import { IContextMenuItem } from '../../components/context-menu/interfaces/context-menu-item.interface';
import { LogActionsModalComponent } from '../../components/log-actions-modal/log-actions-modal.component';
import { ModalService } from '../../services/modal/modal.service';

export abstract class LogCard {
  public isEditing: boolean;
  public cardActions: Array<IContextMenuItem>;

  constructor(
    private readonly _router: Router,
    private readonly _modalService: ModalService,
    private readonly _createUrl: string
  ) {
    this._assignContextMenuItems();
  }

  public navigateToEditPage(date: string): void {
    this._router.navigateByUrl(`${this._createUrl}/edit/${date}`);
  }

  public abstract removeLog(date: string): Promise<void>;

  public onLongPress(date: string): void {
    this._modalService.open(LogActionsModalComponent, {
      data: [
        {
          label: 'Delete log entry',
          icon: 'trash',
          action: async () => {
            await this._modalService.openConfirmationModal({
              onConfirm: () => this.removeLog(date),
              prompt: 'You are about to delete an item from this table.',
              details:
                'This will permanently delete your entry. Do you wish to continue?'
            });

            this.removeLog(date);
          }
        },
        {
          label: 'Edit log entry',
          icon: 'edit',
          action: () => this.navigateToEditPage(date)
        }
      ]
    });
  }

  protected _getContextMenuEditText(): string {
    return this.isEditing ? 'Stop Editing' : 'Enable Editing';
  }

  protected _assignContextMenuItems(): void {
    this.cardActions = [
      {
        label: 'Create Entry',
        action: () => this._router.navigateByUrl(`${this._createUrl}/create`),
        icon: 'plus'
      },
      {
        generateLabel: this._getContextMenuEditText.bind(this),
        action: () => (this.isEditing = !this.isEditing),
        icon: 'edit'
      }
    ];
  }
}
