import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContainer } from 'src/app/lib/form/instances/form-container/form-container';
import { FormFactory } from 'src/app/lib/form/services/form-factory/form-factory.service';

@Component({
  selector: 'app-net-worth-config',
  templateUrl: './net-worth-config.component.html',
  styleUrls: ['./net-worth-config.component.scss']
})
export class NetWorthConfigComponent implements OnInit {
  public columns = ['ISA', 'Santander'];
  public form: FormContainer;

  constructor(private readonly _formFactory: FormFactory) {}

  public ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'column',
        label: 'Add a new column'
      }
    ]);
  }

  public dropColumn(event: CdkDragSortEvent): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public add(): void {
    const control: FormControl = this.form.formGroup.controls
      .column as FormControl;

    if ((control.value || '').trim()) {
      this.columns.push(control.value);
      control.setValue('');
    }
  }

  public remove(column: any): void {
    const index = this.columns.indexOf(column);

    if (index >= 0) {
      this.columns.splice(index, 1);
    }
  }

  public drop(event): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
