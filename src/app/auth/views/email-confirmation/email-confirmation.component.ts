import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';

import { TokenState } from './constants/token-state.enum';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  public state: TokenState;
  public tokenState: typeof TokenState = TokenState;

  private _token: string;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.state = TokenState.LOADING;
    this._spinnerService.show();
    this._token = this._activatedRoute.snapshot.paramMap.get('token');

    try {
      await this._httpService.post(`auth/confirmation/${this._token}`, {});
      this._spinnerService.hide();
      this.state = TokenState.ACTIVATED;
    } catch {
      this.state = TokenState.INVALID;
      this._spinnerService.hide();
    }
  }

  public async resendEmail(): Promise<void> {
    this._spinnerService.show();
    await this._httpService.post(`auth/resend/${this._token}`, {});
    this._spinnerService.hide();
    this.state = TokenState.RESENT;
  }
}
