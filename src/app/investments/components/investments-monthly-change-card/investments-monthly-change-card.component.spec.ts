import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsMonthlyChangeCardComponent } from './investments-monthly-change-card.component';

describe('InvestmentsMonthlyChangeCardComponent', () => {
  let component: InvestmentsMonthlyChangeCardComponent;
  let fixture: ComponentFixture<InvestmentsMonthlyChangeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentsMonthlyChangeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsMonthlyChangeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
