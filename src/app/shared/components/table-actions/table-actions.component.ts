import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  @Input()
  public tableActionsCanEdit: boolean;

  @Output()
  public tableActionsRemove: EventEmitter<string> = new EventEmitter();

  @Output()
  public tableActionsEdit: EventEmitter<string> = new EventEmitter();

  constructor(private readonly _modalService: ModalService) {}

  public remove(): void {
    this._modalService.openConfirmationModal({
      onConfirm: () => this.tableActionsRemove.emit(),
      prompt: 'You are about to delete an item from this table.',
      details:
        'This will permanently delete your entry. Do you wish to continue?'
    });
  }

  public edit(): void {
    this.tableActionsEdit.emit();
  }
}
