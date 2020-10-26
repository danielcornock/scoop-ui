import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss']
})
export class FormSubmitComponent {
  @Input()
  public value: string;

  @Input()
  public form: FormGroup;

  public markFormAsTouched(): void {
    this.form.markAllAsTouched();
  }
}
