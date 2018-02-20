import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {User} from './user';
import {LoginService} from './login.service';
import {UserService} from './user.service';

@Injectable()
export class UserStore {
  private _user: BehaviorSubject<User>;

  constructor(private loginService: LoginService, private userService: UserService) {
    // TODO: better default user
    this._user = new BehaviorSubject({
      email: '',
      firstName: '',
      lastName: '',
      id: -1
    });
    if (this.loginService.loggedIn()) {
      this.userService.getUser().subscribe(user => {
        this.setUser(user);
      });
    }
  }

  get user(): BehaviorSubject<User> {
    return this._user;
  }

  setUser(user: User): void {
    this.user.next(user);
  }
}
