import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import { FormModalComponent } from 'src/app/shared/components/form-modal/form-modal.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

import { INetWorthMeta } from '../../interfaces/net-worth-api-response.interface';
import { INetWorthGoal } from '../../interfaces/net-worth-goal.interface';
import { NetWorthGoalsFormService } from '../../services/net-worth-goals-form/net-worth-goals-form.service';
import { NetWorthGoalsService } from '../../services/net-worth-goals/net-worth-goals.service';
import { GoalCelebrationModalComponent } from '../goal-celebration-modal/goal-celebration-modal.component';

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

  private _displayHidden: boolean;

  constructor(
    private readonly _modalService: ModalService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _netWorthGoalsService: NetWorthGoalsService,
    private readonly _netWorthGoalsFormService: NetWorthGoalsFormService
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
      },
      {
        generateLabel: () =>
          this._displayHidden ? 'Hide hidden goals' : 'Display hidden goals',
        action: () => (this._displayHidden = !this._displayHidden),
        icon: 'eye'
      }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showPercentage = true;
    }, 100);
  }

  public async openCompletedModal(goal: INetWorthGoal): Promise<void> {
    await this._modalService.open(GoalCelebrationModalComponent, {
      data: {
        goal: goal,
        preferredCurrency: this.netWorthGoalsCardMeta.preferredCurrency
      }
    });
  }

  public async setHidden(id: string): Promise<void> {
    const goalToEdit = this.netWorthGoalsCardGoals.find(
      (goal) => goal._id === id
    );
    goalToEdit.isHidden = !goalToEdit.isHidden;

    await this._netWorthGoalsService.setHidden(id, goalToEdit.isHidden);
  }

  public get goals(): Array<INetWorthGoal> {
    if (this._displayHidden) {
      return this.netWorthGoalsCardGoals;
    } else {
      return this.netWorthGoalsCardGoals.filter((goal) => !goal.isHidden);
    }
  }

  public deleteGoal(id: string): void {
    this._modalService.openConfirmationModal({
      prompt: 'You are deleting a goal',
      details:
        'Are you sure you want to delete this goal? Once deleted, it cannot be recovered.',
      onConfirm: async () => {
        try {
          this._spinnerService.show();
          await this._netWorthGoalsService.deleteGoal(id);
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
    const formConfig = this._netWorthGoalsFormService.createConfig(
      this.netWorthGoalsCardMeta.goalsFields
    );

    this._modalService.open(FormModalComponent, {
      data: {
        title: 'Create a goal',
        formConfig,
        onSubmit: this._createGoal.bind(this),
        actionLabel: 'Create goal'
      }
    });
  }

  private _getContextMenuEditText(): string {
    return this.isEditing ? 'Stop Editing' : 'Enable Editing';
  }

  private async _createGoal(formData: any): Promise<void> {
    await this._netWorthGoalsService.createGoal(formData);
  }
}
