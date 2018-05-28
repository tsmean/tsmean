import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from '@tsmean/toast';
import {Observable} from 'rxjs';


import {User, UserWithoutId} from './user';
import {ApiUrl} from './api-url';
import {ResourceService} from '../resource/resource.service';
import {map, catchError} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class UserService {
  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient,
    private notifyService: NotifyService,
    private resourceService: ResourceService
  ) {}

  createUser(user: UserWithoutId, password: string): Observable<User> {
    const $data = this.http
      .post(this.usersApi, {
        user: user,
        password: password
      }).pipe(
        map((resp: any) => resp.data)
      );
    return $data.pipe(catchError(this.handleError));
  }

  getUser(): Observable<User | null> {
    const $data = this.http.get(this.apiUrl + '/users/current')
      .pipe(
        map((resp: any) => resp.data)
      );
    return $data.pipe(
      catchError(() => {
        // cannot fetch user, since not logged in
        return of(null);
      })
    );
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
  }
}
