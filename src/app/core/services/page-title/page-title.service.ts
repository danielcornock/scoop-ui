import { Injectable } from '@angular/core';

import { pageTitles } from './constants/page-title.constant';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  public getTitle(url: string): string {
    const title: string = pageTitles[url];

    if (!title) {
      return '404 Page Not Found';
    } else {
      return title;
    }
  }
}
