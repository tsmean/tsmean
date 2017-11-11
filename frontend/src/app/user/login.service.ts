import {Inject, Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {NotifyService} from 'notify-angular';
import {Cookies} from '@tsmean/cookies';
import {Router} from '@angular/router';
import {User} from './user';
import {WebUtils} from '@tsmean/utils';
import {ApiUrl} from './api-url';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private user: User;

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: Http,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  logIn(email: string, password: string): void {
    const $data = this.http.post(this.loginApi, {email: email, password: password})
      .map(resp => resp.json().data);

    $data.subscribe(resp => {
      this.notifyService.success('logged in');
      Cookies.setCookie('username', email);
      this.router.navigate(['/dashboard']);
    });
  }

  logInAfterSignUp(email: string) {
    Cookies.setCookie('username', email);
  }

  logOut(): void {
    Cookies.setUserCookie('');
    this.router.navigate(['/']);
  }

  loggedIn(): boolean {
    return Cookies.userCookiePresent();
  }

  private get loginApi(): string {
    return WebUtils.urlJoin(this.apiUrl, 'login');
  }


}
