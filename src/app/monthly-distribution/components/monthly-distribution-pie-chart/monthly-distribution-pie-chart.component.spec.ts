import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionPieChartComponent } from './monthly-distribution-pie-chart.component';

describe('MonthlyDistributionPieChartComponent', () => {
  let component: MonthlyDistributionPieChartComponent;
  let fixture: ComponentFixture<MonthlyDistributionPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
