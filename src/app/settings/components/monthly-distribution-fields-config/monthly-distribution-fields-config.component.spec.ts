import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionFieldsConfigComponent } from './monthly-distribution-fields-config.component';

describe('MonthlyDistributionFieldsConfigComponent', () => {
  let component: MonthlyDistributionFieldsConfigComponent;
  let fixture: ComponentFixture<MonthlyDistributionFieldsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionFieldsConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionFieldsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
