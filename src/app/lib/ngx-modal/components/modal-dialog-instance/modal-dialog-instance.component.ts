import { MatDialogRef } from '@angular/material/dialog';

export abstract class ModalDialogInstanceComponent<
  TData = any,
  TReturnData = any
> {
  constructor(
    protected readonly _dialogRef: MatDialogRef<any>,
    private _data: TData
  ) {}

  public close(data?: TReturnData): void {
    this._dialogRef.close(data);
  }

  public get data(): TData {
    return this._data;
  }
}
