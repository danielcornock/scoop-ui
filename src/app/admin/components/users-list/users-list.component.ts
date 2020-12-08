import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input()
  public usersList: Array<any>;

  @Output()
  public usersListDelete = new EventEmitter<string>();

  public deleteUser(id: string): void {
    this.usersListDelete.emit(id);
  }
}
