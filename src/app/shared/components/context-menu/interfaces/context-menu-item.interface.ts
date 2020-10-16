export interface IContextMenuItem {
  label: string;
  icon?: string;
  action(): any;
}
