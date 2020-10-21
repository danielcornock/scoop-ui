import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PageTitleService } from '../../services/page-title/page-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: Observable<string>;

  constructor(
    private readonly _router: Router,
    private readonly _pageTitleService: PageTitleService
  ) {}

  public ngOnInit(): void {
    this.title = this._router.events.pipe(
      filter((event: Event) => {
        return event instanceof NavigationStart;
      }),
      map((event) => {
        return this._pageTitleService.getTitle((event as RouterEvent).url);
      })
    );
  }
}
