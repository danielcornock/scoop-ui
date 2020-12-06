import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthGoalsCardComponent } from './net-worth-goals-card.component';

describe('NetWorthGoalsCardComponent', () => {
  let component: NetWorthGoalsCardComponent;
  let fixture: ComponentFixture<NetWorthGoalsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthGoalsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthGoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
