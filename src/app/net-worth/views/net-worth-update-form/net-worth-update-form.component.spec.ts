import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthUpdateFormComponent } from './net-worth-update-form.component';

describe('NetWorthUpdateFormComponent', () => {
  let component: NetWorthUpdateFormComponent;
  let fixture: ComponentFixture<NetWorthUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
