export interface IHeaderAction {
  label: string;
  action(): void | Promise<void>;
}
