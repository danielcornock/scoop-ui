import { Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard/auth-guard.service';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const coreRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'investments'
  },
  {
    path: '**',
    canActivate: [AuthGuardService],
    component: PageNotFoundComponent
  }
];
