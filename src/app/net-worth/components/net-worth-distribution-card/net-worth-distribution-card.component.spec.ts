import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthDistributionCardComponent } from './net-worth-distribution-card.component';

describe('NetWorthDistributionCardComponent', () => {
  let component: NetWorthDistributionCardComponent;
  let fixture: ComponentFixture<NetWorthDistributionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthDistributionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthDistributionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
