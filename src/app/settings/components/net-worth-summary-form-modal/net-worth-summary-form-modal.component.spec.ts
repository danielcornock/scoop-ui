import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthSummaryFormModalComponent } from './net-worth-summary-form-modal.component';

describe('NetWorthSummaryFormModalComponent', () => {
  let component: NetWorthSummaryFormModalComponent;
  let fixture: ComponentFixture<NetWorthSummaryFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthSummaryFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthSummaryFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
