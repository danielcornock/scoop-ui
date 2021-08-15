import { Observable } from 'rxjs';

export type IContextMenuItem =
  | IContextMenuItemWithoutFactory
  | IContextMenuItemWithFactory;

export interface IContextMenuItemWithFactory {
  icon?: string;
  label?: never;
  hideWhen$?: Observable<boolean>;
  generateLabel(): string;
  action(): any;
}

export interface IContextMenuItemWithoutFactory {
  label: string;
  icon?: string;
  hideWhen$?: Observable<boolean>;
  generateLabel?(): never;
  action(): any;
}
