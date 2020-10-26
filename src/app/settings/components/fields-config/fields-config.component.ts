import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContainer, FormFactory } from 'ngx-form-trooper';

@Component({
  selector: 'app-fields-config',
  templateUrl: './fields-config.component.html',
  styleUrls: ['./fields-config.component.scss']
})
export class FieldsConfigComponent implements OnInit {
  @Input()
  public fieldsConfigColumns: Array<string>;

  public form: FormContainer;

  constructor(private readonly _formFactory: FormFactory) {}

  public ngOnInit(): void {
    this.form = this._formFactory.createForm([
      {
        name: 'fieldsConfigColumns',
        label: 'Add a new column'
      }
    ]);
  }

  public dropColumn(event: CdkDragSortEvent): void {
    moveItemInArray(
      this.fieldsConfigColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  public add(): void {
    const control: FormControl = this.form.formGroup.controls
      .fieldsConfigColumns as FormControl;

    if ((control.value || '').trim()) {
      this.fieldsConfigColumns.push(control.value);
      control.setValue('');
    }
  }

  public remove(column: any): void {
    const index = this.fieldsConfigColumns.indexOf(column);

    if (index >= 0) {
      this.fieldsConfigColumns.splice(index, 1);
    }
  }

  public drop(event): void {
    moveItemInArray(
      this.fieldsConfigColumns,
      event.previousIndex,
      event.currentIndex
    );
  }
}
