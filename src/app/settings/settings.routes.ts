import { Routes } from '@angular/router';

import { SettingsComponent } from './views/settings/settings.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent
  }
];
