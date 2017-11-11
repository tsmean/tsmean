import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {NotifyService} from 'notify-angular';
import {Router} from '@angular/router';

import 'rxjs/operator/catch';
import {UserService} from '../user.service';
import {User} from '../user';
import {UserStore} from '../user.store';

@Component({
  selector: 'user-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  newUser: User = {};

  password = '';

  constructor(
      private userService: UserService,
      private notifyService: NotifyService,
      private router: Router,
      private loginService: LoginService,
      private userStore: UserStore
  ) { }

  doSignUp() {
    this.userService.createUser(this.newUser, this.password).subscribe(user => {
      this.notifyService.success('User created');
      this.userStore.setUser(user);
      this.loginService.logInAfterSignUp(user.email);
      this.router.navigate(['/dashboard']);
    });
  }

}
