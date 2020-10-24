export type IContextMenuItem =
  | IContextMenuItemWithoutFactory
  | IContextMenuItemWithFactory;

interface IContextMenuItemWithFactory {
  icon?: string;
  label?: never;
  generateLabel(): string;
  action(): any;
}

interface IContextMenuItemWithoutFactory {
  label: string;
  icon?: string;
  generateLabel?(): never;
  action(): any;
}
