import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-monthly-distribution-fields-config',
  templateUrl: './monthly-distribution-fields-config.component.html',
  styleUrls: ['./monthly-distribution-fields-config.component.scss']
})
export class MonthlyDistributionFieldsConfigComponent {
  @Input()
  public monthlyDistributionIncomeColumns: Array<string>;

  @Input()
  public monthlyDistributionOutgoingColumns: Array<string>;
}
