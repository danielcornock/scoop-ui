import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCelebrationModalComponent } from './goal-celebration-modal.component';

describe('GoalCelebrationModalComponent', () => {
  let component: GoalCelebrationModalComponent;
  let fixture: ComponentFixture<GoalCelebrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalCelebrationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalCelebrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
