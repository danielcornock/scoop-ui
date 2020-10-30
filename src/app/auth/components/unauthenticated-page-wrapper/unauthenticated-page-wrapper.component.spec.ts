import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedPageWrapperComponent } from './unauthenticated-page-wrapper.component';

describe('UnauthenticatedPageWrapperComponent', () => {
  let component: UnauthenticatedPageWrapperComponent;
  let fixture: ComponentFixture<UnauthenticatedPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedPageWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
