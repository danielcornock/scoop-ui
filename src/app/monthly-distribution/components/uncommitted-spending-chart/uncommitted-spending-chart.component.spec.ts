import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncommittedSpendingChartComponent } from './uncommitted-spending-chart.component';

describe('UncommittedSpendingChartComponent', () => {
  let component: UncommittedSpendingChartComponent;
  let fixture: ComponentFixture<UncommittedSpendingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncommittedSpendingChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncommittedSpendingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
