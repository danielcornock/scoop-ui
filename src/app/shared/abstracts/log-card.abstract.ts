import { Router } from '@angular/router';

import { IContextMenuItem } from '../components/context-menu/interfaces/context-menu-item.interface';

export class LogCard {
  public isEditing: boolean;
  public cardActions: Array<IContextMenuItem>;

  constructor(
    private readonly _router: Router,
    private readonly _createUrl: string
  ) {
    this._assignContextMenuItems();
  }

  protected _getContextMenuEditText(): string {
    return this.isEditing ? 'Stop Editing' : 'Enable Editing';
  }

  protected _assignContextMenuItems(): void {
    this.cardActions = [
      {
        label: 'Create Entry',
        action: () => this._router.navigateByUrl(`${this._createUrl}/create`),
        icon: 'plus'
      },
      {
        generateLabel: this._getContextMenuEditText.bind(this),
        action: () => (this.isEditing = !this.isEditing),
        icon: 'edit'
      }
    ];
  }
}
