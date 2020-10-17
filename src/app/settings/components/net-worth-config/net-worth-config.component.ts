import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContainer } from 'src/app/lib/form/instances/form-container/form-container';
import { FormFactory } from 'src/app/lib/form/services/form-factory/form-factory.service';

@Component({
  selector: 'app-net-worth-config',
  templateUrl: './net-worth-config.component.html',
  styleUrls: ['./net-worth-config.component.scss']
})
export class NetWorthConfigComponent implements OnInit {
  @Input()
  public netWorthColumns: Array<string>;

  @Output()
  public netWorthConfigSubmittedForm: EventEmitter<
    string[]
  > = new EventEmitter();

  public form: FormContainer;

  constructor(private readonly _formFactory: FormFactory) {}

  public ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'netWorthColumns',
        label: 'Add a new column'
      }
    ]);
  }

  public dropColumn(event: CdkDragSortEvent): void {
    moveItemInArray(
      this.netWorthColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  public add(): void {
    const control: FormControl = this.form.formGroup.controls
      .netWorthColumns as FormControl;

    if ((control.value || '').trim()) {
      this.netWorthColumns.push(control.value);
      control.setValue('');
    }
  }

  public remove(column: any): void {
    const index = this.netWorthColumns.indexOf(column);

    if (index >= 0) {
      this.netWorthColumns.splice(index, 1);
    }
  }

  public drop(event): void {
    moveItemInArray(
      this.netWorthColumns,
      event.previousIndex,
      event.currentIndex
    );
  }
}
