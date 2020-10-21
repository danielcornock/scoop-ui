import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormContainer } from 'src/app/lib/form/instances/form-container/form-container';
import { FormFactory } from 'src/app/lib/form/services/form-factory/form-factory.service';

import { INetWorthSummaryItemConfig } from '../../interfaces/settings.interface';
import { SettingsService } from '../../services/settings/settings.service';

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

  public form: FormContainer;
  public availableFields: string[];
  public showForm: boolean;
  public isInvalid: boolean;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _settingsService: SettingsService
  ) {}

  async ngOnInit(): Promise<void> {
    const settings = await this._settingsService.getSettings();

    this.availableFields = settings.netWorthFields;
    this.form = this._formFactory.createForm([
      {
        name: 'label',
        label: 'Label',
        validators: {
          required: true
        }
      },
      {
        name: 'sumOf',
        label: 'Combined Fields',
        validators: {
          required: true
        }
      }
    ]);
  }

  public removeItem(
    index: number,
    array: Array<INetWorthSummaryItemConfig>
  ): void {
    array.splice(index, 1);
  }

  public toggleForm(): void {
    this.showForm = !this.showForm;
  }

  public addOption(): void {
    if (this.form.formGroup.invalid) {
      return;
    }

    this.netWorthSummaryConfigOptions.push(this.form.value);
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

  public getListedItemsString(items: Array<string>): string {
    return items.join(', ');
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
