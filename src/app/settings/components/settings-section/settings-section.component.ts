import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-section',
  templateUrl: './settings-section.component.html',
  styleUrls: ['./settings-section.component.scss']
})
export class SettingsSectionComponent {
  @Input()
  public settingsSectionTitle: string;

  @Input()
  public settingsSectionIcon: string;

  public isExpanded: boolean;

  public expandSettings(): void {
    this.isExpanded = !this.isExpanded;
  }
}
