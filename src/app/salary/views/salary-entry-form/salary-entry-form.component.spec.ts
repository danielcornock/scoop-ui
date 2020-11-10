import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryEntryFormComponent } from './salary-entry-form.component';

describe('SalaryEntryFormComponent', () => {
  let component: SalaryEntryFormComponent;
  let fixture: ComponentFixture<SalaryEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
