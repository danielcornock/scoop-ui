import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsLogCardComponent } from './investments-log-card.component';

describe('InvestmentsLogCardComponent', () => {
  let component: InvestmentsLogCardComponent;
  let fixture: ComponentFixture<InvestmentsLogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentsLogCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsLogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
