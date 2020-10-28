import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedContextMenuComponent } from './detailed-context-menu.component';

describe('DetailedContextMenuComponent', () => {
  let component: DetailedContextMenuComponent;
  let fixture: ComponentFixture<DetailedContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
