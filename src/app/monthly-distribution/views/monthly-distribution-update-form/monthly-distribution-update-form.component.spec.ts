import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionUpdateFormComponent } from './monthly-distribution-update-form.component';

describe('MonthlyDistributionUpdateFormComponent', () => {
  let component: MonthlyDistributionUpdateFormComponent;
  let fixture: ComponentFixture<MonthlyDistributionUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
