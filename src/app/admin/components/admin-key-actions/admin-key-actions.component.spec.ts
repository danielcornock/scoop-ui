import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKeyActionsComponent } from './admin-key-actions.component';

describe('AdminKeyActionsComponent', () => {
  let component: AdminKeyActionsComponent;
  let fixture: ComponentFixture<AdminKeyActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKeyActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKeyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
