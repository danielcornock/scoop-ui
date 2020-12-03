import { Component, Input } from '@angular/core';

import { IContextMenuItem } from '../context-menu/interfaces/context-menu-item.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()
  public cardTitle: string;

  @Input()
  public cardActions: Array<IContextMenuItem>;
}
