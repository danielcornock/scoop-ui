import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { noop } from 'lodash';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

export interface FormPage {
  dirty$: Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class FormDirtyCheckService implements CanDeactivate<FormPage> {
  constructor(private readonly _modalService: ModalService) {}

  canDeactivate(component: FormPage): Observable<boolean> {
    return component.dirty$.pipe(
      switchMap((dirty) => {
        if (!dirty) {
          return of(true);
        }

        return this._modalService.openConfirmationModal({
          prompt: 'You may have unsaved changes on this page.',
          details:
            'Are you sure you want to leave this page? Any changes will be discarded.',
          onConfirm: noop,
          icon: 'edit-2'
        });
      })
    );
  }
}
