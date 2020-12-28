import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { Subject } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import {
  ModalDialogInstanceComponent,
} from 'src/app/lib/ngx-modal/components/modal-dialog-instance/modal-dialog-instance.component';
import { UserSettingsService } from 'src/app/settings/services/user-settings/user-settings.service';

import { InvestmentsProjectionService } from '../../services/investments-projection/investments-projection.service';

@Component({
  selector: 'app-investments-projection-modal',
  templateUrl: './investments-projection-modal.component.html',
  styleUrls: ['./investments-projection-modal.component.scss']
})
export class InvestmentsProjectionModalComponent
  extends ModalDialogInstanceComponent<void, void>
  implements OnInit, AfterViewInit {
  public form: FormContainer;
  public totalProfit: Subject<number> = new Subject();
  public totalInvested: Subject<number> = new Subject();
  public totalValue: Subject<number> = new Subject();
  public preferredCurrency: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: void,
    dialogRef: MatDialogRef<InvestmentsProjectionModalComponent>,
    private readonly _formFactory: FormFactory,
    private readonly _investmentsProjectionService: InvestmentsProjectionService,
    private readonly _userSettingsService: UserSettingsService
  ) {
    super(dialogRef, data);
  }

  async ngOnInit(): Promise<void> {
    this._createForm();
    this.preferredCurrency = (
      await this._userSettingsService.getUserSettings()
    ).preferredCurrency;
  }

  ngAfterViewInit(): void {
    this._calculateResults();
  }

  private _createForm(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'startingAmount',
        label: 'Starting amount',
        type: FormInputType.NUMBER,
        defaultValue: 0
      },
      {
        name: 'years',
        label: 'Years',
        type: FormInputType.SLIDER,
        defaultValue: 25,
        customConfig: {
          min: 0,
          max: 50,
          step: 1
        }
      },
      {
        name: 'monthlyDeposit',
        label: 'Monthly deposit',
        type: FormInputType.NUMBER,
        defaultValue: 500
      },
      {
        name: 'yearlyPercentageReturn',
        label: 'Projected yearly returns (%)',
        type: FormInputType.NUMBER,
        defaultValue: 10
      }
    ]);
  }

  private _calculateResults(): void {
    this.form.formGroup.valueChanges
      .pipe(
        startWith(this.form.value),
        tap((val) => {
          console.log(val);
          const results = this._investmentsProjectionService.getPrediction(
            val as any
          );

          // this.chart.data.datasets[0].data = results.chartData.map(
          //   (x) => x.value.total
          // );

          this.totalInvested.next(results.totalInvested);
          this.totalProfit.next(results.totalProfit);
          this.totalValue.next(results.totalInvestmentValue);
        })
      )
      .subscribe();
  }
}
