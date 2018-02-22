import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from 'notify-angular';
import {WebUtils} from '@tsmean/utils';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {User, UserWithoutId} from './user';
import {ApiUrl} from './api-url';
import {LoginService} from './login.service';
import {ResourceService} from '../resource/resource.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient,
    private notifyService: NotifyService,
    private resourceService: ResourceService,
    private loginService: LoginService
  ) {}

  createUser(user: UserWithoutId, password: string): Observable<User> {
    const $data = this.http
      .post(this.usersApi, {
        user: user,
        password: password
      })
      .map((resp: any) => resp.data);
    return $data.catch(this.handleError);
  }

  getUser(): Observable<User> {
    if (this.loginService.loggedIn()) {
      const $data = this.http.get(WebUtils.urlJoin(this.apiUrl, 'users/current')).map((resp: any) => resp.data);
      return $data.catch(this.handleError);
    } else {
      throw new Error('cannot fetch user, since not logged in');
    }
  }

  getUserById(id: number): Observable<User> {
    return <Observable<User>>this.resourceService.getResource(id, 'users');
  }

  removeUser(id: number): Observable<void> {
    return this.resourceService.deleteResource(id, 'users');
  }

  updateUser(user: User): Observable<User> {
    return <Observable<User>>this.resourceService.updateResource(user, 'users');
  }

  private get usersApi(): string {
    return WebUtils.urlJoin(this.apiUrl, 'users');
  }

  private handleError(errorResp: any): Promise<any> {
    this.notifyService.error(errorResp.statusText);
    return Promise.reject(errorResp.statusText || errorResp);
  }
}
