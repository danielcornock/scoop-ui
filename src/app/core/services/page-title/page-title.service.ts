import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';

import { pageTitles } from './constants/page-title.constant';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  public getTitle(event: NavigationEnd): string {
    const title: string =
      pageTitles[event.url] || pageTitles[event.urlAfterRedirects];

    if (!title) {
      return '404 Page Not Found';
    } else {
      return title;
    }
  }
}
