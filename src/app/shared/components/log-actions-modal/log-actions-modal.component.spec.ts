import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogActionsModalComponent } from './log-actions-modal.component';

describe('LogActionsModalComponent', () => {
  let component: LogActionsModalComponent;
  let fixture: ComponentFixture<LogActionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogActionsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
