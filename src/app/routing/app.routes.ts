import { Routes } from '@angular/router';

import { investmentRoutes } from '../investments/investments.routes';
import { coreRoutes } from './core.routes';

export const routes: Routes = [...investmentRoutes, ...coreRoutes];
