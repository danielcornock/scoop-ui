import { IContextMenuItemWithoutFactory } from '../../context-menu/interfaces/context-menu-item.interface';

export interface IDetailedContextMenuItem {
  id?: string;
  icon: string;
  title: string;
  text: string;
  actions: Array<IContextMenuItemWithoutFactory>;
}
