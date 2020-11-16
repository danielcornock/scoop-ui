import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  public headerTitle: string;

  constructor(private _location: Location) {}

  public goBack(): void {
    this._location.back();
  }
}
