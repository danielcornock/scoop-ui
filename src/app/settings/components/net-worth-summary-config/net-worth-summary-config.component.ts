import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { SCREEN_SIZE, ScreenWidthService } from 'src/app/shared/services/screen-width/screen-width.service';

import { INetWorthSummaryItemConfig } from '../../interfaces/settings.interface';
import {
  INetWorthSummaryFormModalConfig,
} from '../net-worth-summary-form-modal/interfaces/net-worth-summary-form-modal-config.interface';
import { NetWorthSummaryFormModalComponent } from '../net-worth-summary-form-modal/net-worth-summary-form-modal.component';

@Component({
  selector: 'app-net-worth-summary-config',
  templateUrl: './net-worth-summary-config.component.html',
  styleUrls: ['./net-worth-summary-config.component.scss']
})
export class NetWorthSummaryConfigComponent implements OnInit {
  @Input()
  public netWorthSummaryConfigSelectedItems: Array<INetWorthSummaryItemConfig>;

  @Input()
  public netWorthSummaryConfigOptions: Array<INetWorthSummaryItemConfig>;

  @Input()
  public netWorthSummaryConfigAvailableFields: Array<string>;

  public isInvalid: boolean;
  public dragDropDirection$: Observable<string>;
  public isExpanded: boolean;

  constructor(
    private readonly _modalService: ModalService,
    private readonly _screenWidthService: ScreenWidthService
  ) {}

  public ngOnInit(): void {
    this.dragDropDirection$ = this._screenWidthService.getScreenWidth$().pipe(
      switchMap((size: SCREEN_SIZE) => {
        if (size === SCREEN_SIZE.Mobile) {
          return of('vertical');
        } else {
          return of('horizontal');
        }
      })
    );
  }

  public expandSettings(): void {
    this.isExpanded = !this.isExpanded;
  }

  public async openEditModal(
    item: INetWorthSummaryItemConfig,
    index: number,
    array: Array<INetWorthSummaryItemConfig>
  ): Promise<void> {
    const data = await this._modalService.open<
      INetWorthSummaryFormModalConfig,
      INetWorthSummaryItemConfig
    >(NetWorthSummaryFormModalComponent, {
      data: {
        fields: this.netWorthSummaryConfigAvailableFields,
        existingData: item
      }
    });

    if (data) {
      array[index] = data;
    }
  }

  public removeItem(
    index: number,
    array: Array<INetWorthSummaryItemConfig>
  ): void {
    array.splice(index, 1);
  }

  public async openFormModal(): Promise<void> {
    const data = await this._modalService.open<
      INetWorthSummaryFormModalConfig,
      INetWorthSummaryItemConfig
    >(NetWorthSummaryFormModalComponent, {
      data: { fields: this.netWorthSummaryConfigAvailableFields }
    });

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
