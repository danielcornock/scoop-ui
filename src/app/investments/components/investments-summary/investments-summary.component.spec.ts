import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsSummaryComponent } from './investments-summary.component';

describe('InvestmentsSummaryComponent', () => {
  let component: InvestmentsSummaryComponent;
  let fixture: ComponentFixture<InvestmentsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
