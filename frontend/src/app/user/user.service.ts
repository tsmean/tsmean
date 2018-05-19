import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from 'notify-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {User, UserWithoutId} from './user';
import {ApiUrl} from './api-url';
import {ResourceService} from '../resource/resource.service';

@Injectable()
export class UserService {
  constructor(@Inject(ApiUrl) private apiUrl: string,
              private http: HttpClient,
              private notifyService: NotifyService,
              private resourceService: ResourceService) {
  }

  createUser(user: UserWithoutId, password: string): Observable<User> {
    const $data = this.http
      .post(this.usersApi, {
        user: user,
        password: password
      })
      .map((resp: any) => resp.data);
    return $data.catch(this.handleError);
  }

  getUser(): Observable<User | null> {
    const $data = this.http.get(this.apiUrl + '/users/current').map((resp: any) => resp.data);
    return $data.catch(() => {
      // cannot fetch user, since not logged in
      return Observable.of(null);
    });
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
    return this.apiUrl + '/users';
  }

  private handleError = (errorResp: any): Promise<any> => {
    // TODO: don't propagete errors, e.g. post user...
    const error = errorResp.error ? errorResp.error.message : errorResp.statusText || 'An error ocurred';
    this.notifyService.error(error);
    return Promise.reject(error);
  };
}
