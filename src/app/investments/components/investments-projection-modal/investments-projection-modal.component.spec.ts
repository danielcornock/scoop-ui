import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsProjectionModalComponent } from './investments-projection-modal.component';

describe('InvestmentsProjectionModalComponent', () => {
  let component: InvestmentsProjectionModalComponent;
  let fixture: ComponentFixture<InvestmentsProjectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentsProjectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsProjectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
