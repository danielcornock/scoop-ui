import { Component, Input, OnInit } from '@angular/core';

import { IDetailedContextMenuItem } from './interfaces/detailed-context-menu-item.interface';

@Component({
  selector: 'app-detailed-context-menu',
  templateUrl: './detailed-context-menu.component.html',
  styleUrls: ['./detailed-context-menu.component.scss']
})
export class DetailedContextMenuComponent implements OnInit {
  @Input()
  public detailedContextMenuItems: Array<IDetailedContextMenuItem>;

  @Input()
  public detailedContextMenuTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
