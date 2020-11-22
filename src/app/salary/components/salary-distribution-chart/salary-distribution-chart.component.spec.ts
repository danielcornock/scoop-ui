import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDistributionChartComponent } from './salary-distribution-chart.component';

describe('SalaryDistributionChartComponent', () => {
  let component: SalaryDistributionChartComponent;
  let fixture: ComponentFixture<SalaryDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryDistributionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
