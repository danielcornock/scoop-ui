import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthMonthlyChangeCardComponent } from './net-worth-monthly-change-card.component';

describe('NetWorthMonthlyChangeCardComponent', () => {
  let component: NetWorthMonthlyChangeCardComponent;
  let fixture: ComponentFixture<NetWorthMonthlyChangeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthMonthlyChangeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthMonthlyChangeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
