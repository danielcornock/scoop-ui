import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: Array<any>;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this._spinnerService.show();
      const { data } = await this._httpService.get('users');
      this.users = data;
    } finally {
      this._spinnerService.hide();
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      this._spinnerService.show();
      await this._httpService.delete(`users/${id}`);
      this.users = this.users.filter((user) => user._id !== id);
    } finally {
      this._spinnerService.hide();
    }
  }
}
