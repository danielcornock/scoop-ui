export type IContextMenuItem =
  | IContextMenuItemWithoutFactory
  | IContextMenuItemWithFactory;

export interface IContextMenuItemWithFactory {
  icon?: string;
  label?: never;
  generateLabel(): string;
  action(): any;
}

export interface IContextMenuItemWithoutFactory {
  label: string;
  icon?: string;
  generateLabel?(): never;
  action(): any;
}
