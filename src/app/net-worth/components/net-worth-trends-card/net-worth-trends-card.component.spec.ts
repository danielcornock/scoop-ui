import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthTrendsCardComponent } from './net-worth-trends-card.component';

describe('NetWorthTrendsCardComponent', () => {
  let component: NetWorthTrendsCardComponent;
  let fixture: ComponentFixture<NetWorthTrendsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthTrendsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthTrendsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
