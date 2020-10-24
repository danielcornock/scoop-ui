import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogInstanceComponent } from './modal-dialog-instance.component';

describe('ModalDialogInstanceComponent', () => {
  let component: ModalDialogInstanceComponent;
  let fixture: ComponentFixture<ModalDialogInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDialogInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
