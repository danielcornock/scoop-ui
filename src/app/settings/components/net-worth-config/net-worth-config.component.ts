import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-net-worth-config',
  templateUrl: './net-worth-config.component.html',
  styleUrls: ['./net-worth-config.component.scss']
})
export class NetWorthConfigComponent {
  @Input()
  public netWorthColumns: Array<string>;
}
