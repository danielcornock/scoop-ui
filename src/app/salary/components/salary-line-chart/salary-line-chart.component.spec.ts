import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryLineChartComponent } from './salary-line-chart.component';

describe('SalaryLineChartComponent', () => {
  let component: SalaryLineChartComponent;
  let fixture: ComponentFixture<SalaryLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
