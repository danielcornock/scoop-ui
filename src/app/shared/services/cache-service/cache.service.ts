import { Injectable } from '@angular/core';
import { NetWorthStoreService } from 'src/app/net-worth/services/net-worth-store/net-worth-store.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(private readonly _netWorthStoreService: NetWorthStoreService) {}

  public clearAllCaches(): void {
    this._netWorthStoreService.clearCache();
  }
}
