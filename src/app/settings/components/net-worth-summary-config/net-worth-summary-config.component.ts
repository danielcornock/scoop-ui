import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { INetWorthSummaryItemConfig } from '../../interfaces/settings.interface';
import { NetWorthSummaryFormModalComponent } from '../net-worth-summary-form-modal/net-worth-summary-form-modal.component';

@Component({
  selector: 'app-net-worth-summary-config',
  templateUrl: './net-worth-summary-config.component.html',
  styleUrls: ['./net-worth-summary-config.component.scss']
})
export class NetWorthSummaryConfigComponent {
  @Input()
  public netWorthSummaryConfigSelectedItems: Array<INetWorthSummaryItemConfig>;

  @Input()
  public netWorthSummaryConfigOptions: Array<INetWorthSummaryItemConfig>;

  @Input()
  public netWorthSummaryConfigAvailableFields: Array<string>;

  public isInvalid: boolean;

  constructor(private readonly _matDialog: MatDialog) {}

  public removeItem(
    index: number,
    array: Array<INetWorthSummaryItemConfig>
  ): void {
    array.splice(index, 1);
  }

  public openFormModal(): void {
    this._matDialog
      .open(NetWorthSummaryFormModalComponent, {
        data: {
          availableFields: this.netWorthSummaryConfigAvailableFields
        }
      })
      .afterClosed()
      .subscribe(this._addOption.bind(this));
  }

  private _addOption(data: INetWorthSummaryItemConfig): void {
    if (data) {
      this.netWorthSummaryConfigOptions.push(data);
    }
  }

  public dropColumn(event: CdkDragDrop<INetWorthSummaryItemConfig[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (this._selectedItemsIsBiggerThan4(event.container)) {
        return;
      }

      if (this._selectedItemsIsLessThan4(event.previousContainer)) {
        this.isInvalid = true;
      } else {
        this.isInvalid = false;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private _selectedItemsIsLessThan4(previousContainer: CdkDropList): boolean {
    /* Not sure why it is picking up the previous array length as
      one higher than it actually is. Quick fix for now is making it
      check length is less than 5 */

    return (
      previousContainer.id === 'cdk-drop-list-1' &&
      previousContainer.data.length < 5
    );
  }

  private _selectedItemsIsBiggerThan4(container: CdkDropList): boolean {
    return container.id === 'cdk-drop-list-1' && container.data.length >= 4;
  }
}
