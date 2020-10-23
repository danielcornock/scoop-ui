import { Component, OnInit } from '@angular/core';
import { allIcons } from 'angular-feather/icons';
import { chunk, kebabCase } from 'lodash';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {
  public displayIcons: boolean;
  public allIcons = allIcons;
  public chunkedIconKeys: string[][];
  public currentPage = 0;
  public visibleIcons: Array<string>;
  public showPrevButton: boolean;
  public showNextButton: boolean;
  public selectedIcon: string;

  constructor() {}

  ngOnInit(): void {
    this._getChunkedIconKeys();
    this.visibleIcons = this.chunkedIconKeys[0];
    this._setVisibilityOfNavButtons();
  }

  public openIcons(): void {
    this.displayIcons = true;
  }

  public selectIcon(name: string): void {
    this.selectedIcon = kebabCase(name);
    this.displayIcons = false;
  }

  public closeIcons(): void {
    this.displayIcons = false;
  }

  public goToPreviousPage(): void {
    this.currentPage--;
    this.visibleIcons = this.chunkedIconKeys[this.currentPage];

    this._setVisibilityOfNavButtons();
  }

  public goToNextPage(): void {
    this.currentPage++;
    this.visibleIcons = this.chunkedIconKeys[this.currentPage];
    this._setVisibilityOfNavButtons();
  }

  private _setVisibilityOfNavButtons(): void {
    this.showNextButton = this.visibleIcons.length === 60;
    this.showPrevButton = this.currentPage !== 0;
  }

  private _getChunkedIconKeys(): void {
    const allKeys: Array<string> = Object.keys(this.allIcons).map(kebabCase);

    this.chunkedIconKeys = chunk(allKeys, 60);
  }
}
