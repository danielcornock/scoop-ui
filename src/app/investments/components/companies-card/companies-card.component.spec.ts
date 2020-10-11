import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCardComponent } from './companies-card.component';

describe('CompaniesCardComponent', () => {
  let component: CompaniesCardComponent;
  let fixture: ComponentFixture<CompaniesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
