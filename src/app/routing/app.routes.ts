import { Routes } from '@angular/router';

import { authRoutes } from '../auth/auth.routes';
import { AuthGuardService } from '../auth/services/auth-guard/auth-guard.service';
import { PageNotFoundComponent } from '../core/views/page-not-found/page-not-found.component';
import { settingsRoutes } from '../settings/settings.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'net-worth'
  },
  ...authRoutes,
  {
    path: 'download',
    loadChildren: () =>
      import('../download/download.module').then((m) => m.DownloadModule)
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'investments',
        loadChildren: () =>
          import('../investments/investments.module').then(
            (m) => m.InvestmentsModule
          )
      },
      {
        path: 'net-worth',
        loadChildren: () =>
          import('../net-worth/net-worth.module').then((m) => m.NetWorthModule)
      },
      {
        path: 'monthly-distribution',
        loadChildren: () =>
          import('../monthly-distribution/monthly-distribution.module').then(
            (m) => m.MonthlyDistributionModule
          )
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'salary',
        loadChildren: () =>
          import('../salary/salary.module').then((m) => m.SalaryModule)
      },
      ...settingsRoutes
    ]
  },
  {
    path: '**',
    canActivate: [AuthGuardService],
    component: PageNotFoundComponent
  }
];
