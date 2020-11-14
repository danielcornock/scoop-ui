export interface IPopupWithAction {
  title: string;
  text: string;
  onClick: () => void | Promise<void>;
}
