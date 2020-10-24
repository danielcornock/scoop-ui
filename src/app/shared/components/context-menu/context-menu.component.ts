import { Component, Input } from '@angular/core';
import { isFunction } from 'lodash';

import { IContextMenuItem } from './interfaces/context-menu-item.interface';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input()
  public contextMenuItems: Array<IContextMenuItem>;

  public isFunction = isFunction;

  public selectItem(index: number): void {
    this.contextMenuItems[index].action();
  }
}
