import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SCREEN_SIZE, ScreenWidthService } from 'src/app/shared/services/screen-width/screen-width.service';

@Component({
  selector: 'app-fields-config',
  templateUrl: './fields-config.component.html',
  styleUrls: ['./fields-config.component.scss']
})
export class FieldsConfigComponent implements OnInit {
  @Input()
  public fieldsConfigColumns: Array<string>;

  public form: FormContainer;
  public dragDropDirection$: Observable<string>;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _screenWidthService: ScreenWidthService
  ) {}

  public ngOnInit(): void {
    this.dragDropDirection$ = this._screenWidthService.getScreenWidth$().pipe(
      switchMap((size: SCREEN_SIZE) => {
        if (size === SCREEN_SIZE.Mobile) {
          return of('vertical');
        } else {
          return of('horizontal');
        }
      })
    );

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
