import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-net-worth-config',
  templateUrl: './net-worth-config.component.html',
  styleUrls: ['./net-worth-config.component.scss']
})
export class NetWorthConfigComponent implements OnInit {
  public columns = ['ISA', 'Santander'];
  public form: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      column: this._formBuilder.control('')
    });
  }

  public dropColumn(event: CdkDragSortEvent): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public add(): void {
    const control: FormControl = this.form.controls.column as FormControl;

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
