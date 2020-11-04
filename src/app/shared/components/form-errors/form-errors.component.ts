import { Component, Input, OnChanges } from '@angular/core';
import { isString } from 'lodash';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnChanges {
  @Input()
  public appFormErrors: IHttpError;

  public hasErrors: boolean;
  public error: string;

  public ngOnChanges(): void {
    if (!this.appFormErrors) {
      this.hasErrors = false;
      this.error = null;
      return;
    }

    this.hasErrors = true;

    if (Array.isArray(this.appFormErrors.message)) {
      this.error = this._capitaliseError(this.appFormErrors.message[0]);
    } else if (this.appFormErrors.message) {
      this.error = this._capitaliseError(this.appFormErrors.message);
    } else if (isString(this.appFormErrors)) {
      this.error = this.appFormErrors;
    } else {
      this.error = 'An unknown error occured. Please try again later.';
    }
  }

  private _capitaliseError(error: string): string {
    return error.charAt(0).toUpperCase() + error.slice(1);
  }
}
