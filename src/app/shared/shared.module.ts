import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [CardComponent, TableComponent],
  imports: [CommonModule],
  exports: [CardComponent, TableComponent]
})
export class SharedModule {}
