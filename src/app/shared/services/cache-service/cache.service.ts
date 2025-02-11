import { Injectable } from '@angular/core';
import { InvestmentsStoreService } from 'src/app/investments/services/investments-store/investments-store.service';
import {
  MonthlyDistributionStoreService,
} from 'src/app/monthly-distribution/services/monthly-distribution-store/monthly-distribution-store.service';
import { NetWorthStoreService } from 'src/app/net-worth/services/net-worth-store/net-worth-store.service';
import { SalaryStoreService } from 'src/app/salary/services/salary-store/salary-store.service';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { UserSettingsService } from 'src/app/settings/services/user-settings/user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(
    private readonly _netWorthStoreService: NetWorthStoreService,
    private readonly _investmentsStoreService: InvestmentsStoreService,
    private readonly _monthlyDistributionStoreService: MonthlyDistributionStoreService,
    private readonly _salaryStore: SalaryStoreService,
    private readonly _settingsService: SettingsService,
    private readonly _userSettingsService: UserSettingsService
  ) {}

  public clearAllFeatureCaches(): void {
    this._netWorthStoreService.clearCache();
    this._monthlyDistributionStoreService.clearCache();
    this._investmentsStoreService.clearCache();
    this._salaryStore.clearCache();
  }

  public clearAllCaches(): void {
    this.clearAllFeatureCaches();
    this._settingsService.clearCache();
    this._userSettingsService.clearCache();
  }
}
