import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss']
})
export class FloatingActionButtonComponent {
  @Input()
  public floatingActionButtonText: string;

  @Input()
  public floatingActionButtonIcon: string;

  @Output()
  public floatingActionButtonAction: EventEmitter<void> = new EventEmitter();

  public clickAction(): void {
    this.floatingActionButtonAction.emit();
  }
}
