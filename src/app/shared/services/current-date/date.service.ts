import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {}

  public getCurrentDateForForm(): string {
    return this.getDateForForm(Date.now());
  }

  public getCurrentMonthAndYearForForm(): string {
    return this.getMonthAndYearForForm(Date.now());
  }

  public getMonthAndYearForForm(dateString: number | string): string {
    const date: Date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);

    if (month.length < 2) {
      month = '0' + month;
    }

    return [year, month].join('-');
  }

  public getDateForForm(dateString: number | string): string {
    const date: Date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
