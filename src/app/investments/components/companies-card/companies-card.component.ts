import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies-card',
  templateUrl: './companies-card.component.html',
  styleUrls: ['./companies-card.component.scss']
})
export class CompaniesCardComponent implements OnInit {
  public companiesCardStocks = [
    { stock: 'Vanguard S&P 500', value: '£1200', percentage: '32%' },
    { stock: 'iShares Global Clean Energy', value: '£900', percentage: '24%' },
    { stock: 'Amazon', value: '£300', percentage: '12%' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
