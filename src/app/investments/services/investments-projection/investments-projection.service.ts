import { Injectable } from '@angular/core';

import { InvestmentsProjections } from './interfaces/investment-projections.interface';
import { InvestmentsProjectionOptions } from './interfaces/investments-projection-options.interface';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsProjectionService {
  constructor() {}

  public getPrediction(
    options: InvestmentsProjectionOptions
  ): InvestmentsProjections {
    let totalInvested = options.startingAmount;

    const decimalChange = 1 + options.yearlyPercentageReturn / 100;

    const totalInvestmentValue = Array.from(new Array(options.years)).reduce(
      (accum) => {
        const yearlyDeposit = options.monthlyDeposit * 12;
        const newTotal = (accum + yearlyDeposit) * decimalChange;
        totalInvested += yearlyDeposit;

        return newTotal;
      },
      options.startingAmount
    );

    return {
      totalInvestmentValue: Math.round(totalInvestmentValue),
      totalInvested: Math.round(totalInvested),
      totalProfit: Math.round(totalInvestmentValue - totalInvested)
    };
  }
}
