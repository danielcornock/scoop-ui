import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionComponent } from './monthly-distribution.component';

describe('MonthlyDistributionComponent', () => {
  let component: MonthlyDistributionComponent;
  let fixture: ComponentFixture<MonthlyDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
