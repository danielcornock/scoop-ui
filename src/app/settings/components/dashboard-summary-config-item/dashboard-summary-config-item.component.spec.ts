import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSummaryConfigItemComponent } from './dashboard-summary-config-item.component';

describe('DashboardSummaryConfigItemComponent', () => {
  let component: DashboardSummaryConfigItemComponent;
  let fixture: ComponentFixture<DashboardSummaryConfigItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSummaryConfigItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSummaryConfigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
