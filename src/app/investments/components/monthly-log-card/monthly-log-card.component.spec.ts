import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLogCardComponent } from './monthly-log-card.component';

describe('MonthlyLogCardComponent', () => {
  let component: MonthlyLogCardComponent;
  let fixture: ComponentFixture<MonthlyLogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyLogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyLogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
