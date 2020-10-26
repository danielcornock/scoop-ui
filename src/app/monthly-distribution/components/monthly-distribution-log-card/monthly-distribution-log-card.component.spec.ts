import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionLogCardComponent } from './monthly-distribution-log-card.component';

describe('MonthlyDistributionLogCardComponent', () => {
  let component: MonthlyDistributionLogCardComponent;
  let fixture: ComponentFixture<MonthlyDistributionLogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionLogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionLogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
