import { Routes } from '@angular/router';

import { investmentRoutes } from '../investments/investments.routes';
import { monthlyDistributionRoutes } from '../monthly-distribution/monthly-distribution.routes';
import { netWorthRoutes } from '../net-worth/net-worth.routes';
import { coreRoutes } from './core.routes';

export const routes: Routes = [
  ...investmentRoutes,
  ...netWorthRoutes,
  ...monthlyDistributionRoutes,
  ...coreRoutes
];
