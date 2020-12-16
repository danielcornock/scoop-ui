import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { INetWorthGoal } from '../../interfaces/net-worth-goal.interface';
import { NetWorthStoreService } from '../net-worth-store/net-worth-store.service';

@Injectable({
  providedIn: 'root'
})
export class NetWorthGoalsService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _netWorthStoreService: NetWorthStoreService
  ) {}

  public async setHidden(id: string, isHidden: boolean): Promise<void> {
    await this._httpService.patch(`net-worth-goals/hidden/${id}`, {
      isHidden
    });
  }

  public async deleteGoal(id: string): Promise<void> {
    await this._httpService.delete(`net-worth-goals/${id}`);
  }

  public async createGoal(data: any): Promise<IHttpResponse<INetWorthGoal>> {
    const goal = await this._httpService.post('net-worth-goals', data);
    this._netWorthStoreService.invalidateCollection();

    return goal;
  }

  public async acknowledgeGoal(id: string): Promise<void> {
    await this._httpService.patch(
      `net-worth-goals/acknowledged-congraulations/${id}`,
      {}
    );
  }
}
