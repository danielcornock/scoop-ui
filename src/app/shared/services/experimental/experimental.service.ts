import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExperimentalService {
  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  public isDevelopment(): boolean {
    return isDevMode();
  }

  public async toggleExperimental(): Promise<void> {
    const currentState =
      this._activatedRoute.snapshot.queryParams.isExperimental === 'true';

    await this._router.navigate([], {
      queryParams: { isExperimental: !currentState },
      preserveFragment: true
    });

    window.location.reload();
  }

  public isExperimental(): boolean {
    return this._activatedRoute.snapshot.queryParams.isExperimental === 'true';
  }
}
