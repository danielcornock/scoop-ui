import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthSummaryConfigComponent } from './net-worth-summary-config.component';

describe('NetWorthSummaryConfigComponent', () => {
  let component: NetWorthSummaryConfigComponent;
  let fixture: ComponentFixture<NetWorthSummaryConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthSummaryConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthSummaryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
