import { Routes } from '@angular/router';

import { authRoutes } from '../auth/auth.routes';
import { investmentRoutes } from '../investments/investments.routes';
import { monthlyDistributionRoutes } from '../monthly-distribution/monthly-distribution.routes';
import { netWorthRoutes } from '../net-worth/net-worth.routes';
import { coreRoutes } from './core.routes';

export const routes: Routes = [
  ...authRoutes,
  ...investmentRoutes,
  ...netWorthRoutes,
  ...monthlyDistributionRoutes,
  ...coreRoutes
];
