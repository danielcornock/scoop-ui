import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionSpendingTrendChartComponent } from './monthly-distribution-spending-trend-chart.component';

describe('MonthlyDistributionSpendingTrendChartComponent', () => {
  let component: MonthlyDistributionSpendingTrendChartComponent;
  let fixture: ComponentFixture<MonthlyDistributionSpendingTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionSpendingTrendChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionSpendingTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
