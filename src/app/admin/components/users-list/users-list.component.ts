import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: Array<any>;

  constructor(private readonly _httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    const { data } = await this._httpService.get('users');
    this.users = data;
  }
}
