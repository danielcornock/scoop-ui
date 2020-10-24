import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  @Output()
  public tableActionsRemove: EventEmitter<string> = new EventEmitter();

  public remove(): void {
    this.tableActionsRemove.emit();
  }
}
