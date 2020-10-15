import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._createForm();
  }

  public async login(): Promise<void> {
    console.log(this.loginForm);

    const { data } = await this._httpService.post(
      'auth/login',
      this.loginForm.value
    );
    this._authService.setJwt(data.jwt);
    this._router.navigateByUrl('investments');
  }

  private _createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control('', Validators.required),
      password: this._formBuilder.control('', Validators.required)
    });
  }
}
