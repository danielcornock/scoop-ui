import { MatDialogRef } from '@angular/material/dialog';

export abstract class ModalDialogInstanceComponent<
  TComponent,
  TData = any,
  TReturnData = any
> {
  constructor(
    private readonly _dialogRef: MatDialogRef<TComponent>,
    private _data: TData
  ) {}

  protected close(data: TReturnData): void {
    this._dialogRef.close(data);
  }

  protected get data(): any {
    return this._data;
  }
}
