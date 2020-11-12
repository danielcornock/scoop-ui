import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryLogComponent } from './salary-log.component';

describe('SalaryLogComponent', () => {
  let component: SalaryLogComponent;
  let fixture: ComponentFixture<SalaryLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
