import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthLogComponent } from './net-worth-log.component';

describe('NetWorthLogComponent', () => {
  let component: NetWorthLogComponent;
  let fixture: ComponentFixture<NetWorthLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
