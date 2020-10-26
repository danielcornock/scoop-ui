import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDistributionEntryFormComponent } from './monthly-distribution-entry-form.component';

describe('MonthlyDistributionEntryFormComponent', () => {
  let component: MonthlyDistributionEntryFormComponent;
  let fixture: ComponentFixture<MonthlyDistributionEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDistributionEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDistributionEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
