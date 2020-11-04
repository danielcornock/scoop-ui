import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';

@Component({
  selector: 'app-create-custom-notification-modal',
  templateUrl: './create-custom-notification-modal.component.html',
  styleUrls: ['./create-custom-notification-modal.component.scss']
})
export class CreateCustomNotificationModalComponent
  extends ModalDialogInstanceComponent
  implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    dialogRef: MatDialogRef<CreateCustomNotificationModalComponent>
  ) {
    super(dialogRef, {});
  }

  ngOnInit(): void {
    this._createForm();
  }

  public async submitForm(): Promise<void> {
    this.errors = null;
    try {
      this._spinnerService.show();
      await this._httpService.post(
        'admin/notifications/global',
        this.form.value
      );
      this.close(undefined);
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }

  private _createForm(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'title',
        label: 'Title'
      },
      {
        name: 'text',
        label: 'Message',
        type: 'textarea'
      }
    ]);
  }
}
