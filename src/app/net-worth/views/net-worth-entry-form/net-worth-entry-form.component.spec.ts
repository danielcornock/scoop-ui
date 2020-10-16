import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthEntryFormComponent } from './net-worth-entry-form.component';

describe('NetWorthEntryFormComponent', () => {
  let component: NetWorthEntryFormComponent;
  let fixture: ComponentFixture<NetWorthEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
