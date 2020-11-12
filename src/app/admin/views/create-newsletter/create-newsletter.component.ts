import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';

@Component({
  selector: 'app-create-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.scss']
})
export class CreateNewsletterComponent implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._createForm();
  }

  public async sendEmail(): Promise<void> {
    if (this.form.isInvalid) {
      return;
    }

    try {
      this._spinnerService.show();
      await this._httpService.post('admin/send-newsletter', this.form.value);
      this._router.navigateByUrl('admin');
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }

  private _createForm(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'subject',
        label: 'Email subject',
        validators: {
          required: true
        }
      },
      {
        name: 'content',
        label: 'Email content',
        type: FormInputType.HTML,
        validators: {
          required: true
        }
      }
    ]);
  }
}
