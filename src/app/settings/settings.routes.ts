import { Routes } from '@angular/router';

import { DirtyCheckService } from '../core/services/dirty-check/dirty-check.service';
import { FormDirtyCheckService } from '../core/services/form-dirty-check/form-dirty-check.service';
import { SettingsComponent } from './views/settings/settings.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canDeactivate: [DirtyCheckService]
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent,
    canDeactivate: [FormDirtyCheckService]
  }
];
