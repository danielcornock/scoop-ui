import { Routes } from '@angular/router';

import { authRoutes } from '../auth/auth.routes';
import { AuthGuardService } from '../auth/services/auth-guard/auth-guard.service';
import { investmentRoutes } from '../investments/investments.routes';
import { monthlyDistributionRoutes } from '../monthly-distribution/monthly-distribution.routes';
import { netWorthRoutes } from '../net-worth/net-worth.routes';
import { settingsRoutes } from '../settings/settings.routes';
import { coreRoutes } from './core.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      ...investmentRoutes,
      ...netWorthRoutes,
      ...monthlyDistributionRoutes,
      ...settingsRoutes
    ]
  },
  ...coreRoutes
];
