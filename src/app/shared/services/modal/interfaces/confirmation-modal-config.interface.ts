export interface IConfirmationModalConfig {
  prompt: string;
  details: string;
  icon?: string;
  onConfirm(): any | Promise<any>;
}

export interface IConfirmationModalData {
  prompt: string;
  details: string;
  icon?: string;
}
