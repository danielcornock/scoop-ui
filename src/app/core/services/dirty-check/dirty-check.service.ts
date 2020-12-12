import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { noop } from 'lodash';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

export interface DirtyComponent {
  hasChanged(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DirtyCheckService implements CanDeactivate<DirtyComponent> {
  constructor(private readonly _modalService: ModalService) {}

  async canDeactivate(component: DirtyComponent): Promise<boolean> {
    if (component.hasChanged()) {
      return this._modalService.openConfirmationModal({
        prompt: 'You may have unsaved changes on this page.',
        details:
          'Are you sure you want to leave this page? Any changes will be discarded.',
        onConfirm: noop,
        icon: 'edit-2'
      });
    }

    return true;
  }
}
