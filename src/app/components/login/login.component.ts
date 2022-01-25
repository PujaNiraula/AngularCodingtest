import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginResult } from './login.datamodel';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginErrorMessage: string = '';
  constructor(private fb: FormBuilder, private loginService: LoginService) { }


  loginForm = this.fb.group({
    username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    this.loginErrorMessage = '';

    // validate login form and return if form is invalid
    if(this.loginForm.invalid) return true;

    this.loginService.login(this.loginForm.value).then((res: ILoginResult) => {
      console.log('res', res);
      if(res.loginSuccessful) {
        this.resetLoginForm();
        alert('Login successfully');
        // Login successfully, redirect user to dashboard
      } else {
        // set error messages
        this.loginErrorMessage = res?.error?.message || `Something went wrong, please try again`;
      }
    });

    return;
  }

  resetLoginForm(withErrMsg = true): void {
    this.submitted = false;
    this.loginForm.reset();

    // this is optional resetting global login message
    if(withErrMsg) {
      this.loginErrorMessage = '';
    }
  }
}
