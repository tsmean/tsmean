import {Injectable} from '@angular/core';
import {User} from './user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoginService} from './login.service';
import {UserService} from './user.service';

@Injectable()
export class UserStore {

  private _user: BehaviorSubject<User>;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {
    this._user = new BehaviorSubject({});
    if (this.loginService.loggedIn()) {
      this.userService.getUser().subscribe(user => {
        this.setUser(user);
      })
    }
  }

  get user(): BehaviorSubject<User> {
    return this._user;
  }

  setUser(user: User): void {
    this.user.next(user);
  }

}
