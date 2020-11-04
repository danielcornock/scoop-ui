import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomNotificationModalComponent } from './create-custom-notification-modal.component';

describe('CreateCustomNotificationModalComponent', () => {
  let component: CreateCustomNotificationModalComponent;
  let fixture: ComponentFixture<CreateCustomNotificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomNotificationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomNotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
