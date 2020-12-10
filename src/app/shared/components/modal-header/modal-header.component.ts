import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent {
  @Input()
  public modalHeaderText: string;

  @Output()
  public modalHeaderClose = new EventEmitter();

  public onClose(): void {
    this.modalHeaderClose.emit();
  }
}
