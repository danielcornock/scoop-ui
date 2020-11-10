import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd } from '@angular/router';
import { find } from 'lodash';

import { pageTitles } from './constants/page-title.constant';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  constructor(private readonly _titleService: Title) {}

  public getTitle(event: NavigationEnd): string {
    const formattedUrlString = event.url.split('?')[0];
    const formattedRedirectUrl = event.urlAfterRedirects.split('?')[0];

    const title: string =
      pageTitles[formattedUrlString] ||
      pageTitles[formattedRedirectUrl] ||
      this._findMatchingUrlPaths(formattedUrlString);

    if (!title) {
      this._titleService.setTitle(`Scoop | 404 Page Not Found`);
      return '404 Page Not Found';
    } else {
      this._titleService.setTitle(`Scoop | ${title}`);
      return title;
    }
  }

  private _findMatchingUrlPaths(url: string): string {
    return find(pageTitles, (value: string, key: string) => {
      return url.includes(key);
    });
  }
}
