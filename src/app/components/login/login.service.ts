import { Injectable } from '@angular/core';
import { ILoginResult } from './login.datamodel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn: boolean;

  constructor() {
    this.isUserLoggedIn = false;
  }

  getUserLoggedInStatus(): boolean {
    return this.isUserLoggedIn;
  }

  login(loginDetails : any): Promise<ILoginResult> {
    const {username, password} = loginDetails;
    let result = {} as ILoginResult;

    return new Promise((resolve, reject) => {

      // static user login comparasion for user authentications
      if((username === 'admin' && password === 'admin123') ||
          (username === 'user' && password === 'user123') ) {
            result.loginSuccessful = true;
            this.isUserLoggedIn = true;
        } else {
          result.loginSuccessful = false;
          result.error = { errorCode: '201', errorType: 'error', message: 'Invalid username or password' }
        }
      resolve(result);
    })

  }
}
