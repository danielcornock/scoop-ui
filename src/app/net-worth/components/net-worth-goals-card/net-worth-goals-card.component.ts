import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { startCase } from 'lodash';
import { FormInputType, IFormFactoryConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import { FormModalComponent } from 'src/app/shared/components/form-modal/form-modal.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

import { INetWorthMeta } from '../../interfaces/net-worth-api-response.interface';
import { INetWorthGoal } from '../../interfaces/net-worth-goal.interface';

@Component({
  selector: 'app-net-worth-goals-card',
  templateUrl: './net-worth-goals-card.component.html',
  styleUrls: ['./net-worth-goals-card.component.scss']
})
export class NetWorthGoalsCardComponent implements OnInit, AfterViewInit {
  @Input()
  public netWorthGoalsCardGoals: Array<INetWorthGoal>;

  @Input()
  public netWorthGoalsCardMeta: INetWorthMeta;

  public actions: Array<IContextMenuItem>;
  public showPercentage: boolean;
  public isEditing: boolean;

  constructor(
    private readonly _modalService: ModalService,
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.actions = [
      {
        label: 'Create goal',
        icon: 'target',
        action: this.openModal.bind(this)
      },
      {
        generateLabel: this._getContextMenuEditText.bind(this),
        action: () => (this.isEditing = !this.isEditing),
        icon: 'edit'
      }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showPercentage = true;
    }, 100);
  }

  public deleteGoal(id: string): void {
    this._modalService.openConfirmationModal({
      prompt: 'You are deleting a goal',
      details:
        'Are you sure you want to delete this goal? Once deleted, it cannot be recovered.',
      onConfirm: async () => {
        try {
          this._spinnerService.show();
          await this._httpService.delete(`net-worth-goals/${id}`);
          this.netWorthGoalsCardGoals = this.netWorthGoalsCardGoals.filter(
            (goal) => goal._id !== id
          );
        } finally {
          this._spinnerService.hide();
        }
      }
    });
  }

  public openModal(): void {
    this._createFormConfig();
    this._modalService.open(FormModalComponent, {
      data: {
        title: 'Create a goal',
        formConfig: this._createFormConfig(),
        onSubmit: this._createGoal.bind(this),
        actionLabel: 'Create goal'
      }
    });
  }

  private _getContextMenuEditText(): string {
    return this.isEditing ? 'Stop Editing' : 'Enable Editing';
  }

  private async _createGoal(formData: any): Promise<void> {
    await this._httpService.post('net-worth-goals', formData);
  }

  private _createFormConfig(): IFormFactoryConfig {
    return [
      {
        name: 'title',
        label: 'Name your goal',
        type: FormInputType.TEXT,
        validators: {
          required: true
        }
      },
      {
        name: 'target',
        label: 'Target amount',
        type: FormInputType.NUMBER,
        validators: {
          required: true,
          min: 0
        }
      },
      {
        name: 'fields',
        label: 'What values should this include?',
        type: FormInputType.MUTLI_SELECT,
        validators: {
          required: true,
          minLength: 1
        },
        options: this.netWorthGoalsCardMeta.goalsFields.map((field) => ({
          label: startCase(field),
          value: field
        }))
      },
      {
        name: 'goalType',
        label: 'What type of goal would you like to set?',
        type: FormInputType.RADIO,
        validators: {
          required: true
        },
        options: [
          { label: 'All time (includes existing progress)', value: '0' },
          { label: 'From now', value: 'now' }
        ]
      },
      {
        name: 'endDate',
        label: 'When do you aim to reach your goal? (optional)',
        type: FormInputType.DATE
      }
    ];
  }
}
