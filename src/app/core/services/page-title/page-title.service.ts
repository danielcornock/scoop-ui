import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { find } from 'lodash';

import { pageTitles } from './constants/page-title.constant';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  public getTitle(event: NavigationEnd): string {
    const formattedUrlString = event.url.split('?')[0];
    const formattedRedirectUrl = event.urlAfterRedirects.split('?')[0];

    const title: string =
      pageTitles[formattedUrlString] ||
      pageTitles[formattedRedirectUrl] ||
      this._findMatchingUrlPaths(formattedUrlString);

    if (!title) {
      return '404 Page Not Found';
    } else {
      return title;
    }
  }

  private _findMatchingUrlPaths(url: string): string {
    return find(pageTitles, (value: string, key: string) => {
      return url.includes(key);
    });
  }
}
