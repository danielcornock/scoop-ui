import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private readonly _toast: ToastrService) {}

  public showApiError(error: IHttpError): void {
    if (Array.isArray(error.message)) {
      this._toast.error(error.message[0], 'Uh oh!');
    } else {
      this._toast.error(error.message, 'Uh oh!');
    }
  }

  public showCustomError(text: string, title: string): void {
    this._toast.error(text, title);
  }

  public showSuccess(text: string, title: string): void {
    this._toast.success(text, title);
  }
}
