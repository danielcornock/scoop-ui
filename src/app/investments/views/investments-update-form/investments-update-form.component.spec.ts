import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsUpdateFormComponent } from './investments-update-form.component';

describe('InvestmentsUpdateFormComponent', () => {
  let component: InvestmentsUpdateFormComponent;
  let fixture: ComponentFixture<InvestmentsUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentsUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
