import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control('', Validators.required),
      password: this._formBuilder.control('', Validators.required)
    });
  }
}
