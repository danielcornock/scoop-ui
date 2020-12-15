import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalDialogInstanceComponent } from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';
import { ConfettiService } from 'src/app/shared/services/confetti/confetti.service';

import { INetWorthGoal } from '../../interfaces/net-worth-goal.interface';
import { IGoalCelebrationModalConfig } from './interfaces/goal-celebration-modal-config.interface';

@Component({
  selector: 'app-goal-celebration-modal',
  templateUrl: './goal-celebration-modal.component.html',
  styleUrls: ['./goal-celebration-modal.component.scss']
})
export class GoalCelebrationModalComponent
  extends ModalDialogInstanceComponent<IGoalCelebrationModalConfig, void>
  implements OnInit, OnDestroy {
  public netWorthGoal: INetWorthGoal;
  public completedOn: number;
  public preferredCurrency: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: IGoalCelebrationModalConfig,
    dialogRef: MatDialogRef<GoalCelebrationModalComponent>,
    private readonly _confettiService: ConfettiService
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    this._confettiService.setOff();
    this.netWorthGoal = this.data.goal;
    this.preferredCurrency = this.data.preferredCurrency;
    this.completedOn = this.netWorthGoal.completedOn || Date.now();
  }

  ngOnDestroy(): void {
    this._confettiService.hide();
  }
}
