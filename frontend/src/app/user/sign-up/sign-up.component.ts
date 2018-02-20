import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotifyService} from 'notify-angular';
import 'rxjs/operator/catch';

import {LoginService} from '../login.service';
import {UserService} from '../user.service';
import {User, UserWithoutId} from '../user';
import {UserStore} from '../user.store';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  newUser: UserWithoutId = {
    email: '',
    firstName: '',
    lastName: ''
  };

  password = '';

  constructor(
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router,
    private loginService: LoginService,
    private userStore: UserStore
  ) {}

  doSignUp() {
    this.userService.createUser(this.newUser, this.password).subscribe(user => {
      this.notifyService.success('User created');
      this.userStore.setUser(user);
      this.loginService.logInAfterSignUp(user.email);
      this.router.navigate(['/dashboard']);
    });
  }
}
