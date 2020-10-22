import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsEntryFormComponent } from './investments-entry-form.component';

describe('InvestmentsEntryFormComponent', () => {
  let component: InvestmentsEntryFormComponent;
  let fixture: ComponentFixture<InvestmentsEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentsEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
