import { Component, Input, OnChanges } from '@angular/core';
import { barChartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-uncommitted-spending-chart',
  templateUrl: './uncommitted-spending-chart.component.html',
  styleUrls: ['./uncommitted-spending-chart.component.scss']
})
export class UncommittedSpendingChartComponent implements OnChanges {
  @Input()
  public uncommittedSpendingChartData: Array<{ date: string; value: number }>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnChanges(): void {
    const formattedData = [...this.uncommittedSpendingChartData].reverse();
    this._chartService.createBarChart('monthlyDistributionSpendingChart', {
      labels: formattedData.map((item) => item.date),
      datasets: [
        {
          label: 'Uncommitted spending this month',
          data: formattedData.map((data) => data.value),
          borderColor: 'rgba(255,255,255, 0)',
          backgroundColor: [...barChartColors],
          borderWidth: 2
        }
      ]
    });
  }
}
