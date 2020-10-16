import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthConfigComponent } from './net-worth-config.component';

describe('NetWorthConfigComponent', () => {
  let component: NetWorthConfigComponent;
  let fixture: ComponentFixture<NetWorthConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
