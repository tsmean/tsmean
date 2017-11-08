import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

import {NotifyService} from 'notify-angular';
import {User} from '../user';
import {UserStore} from '../user.store';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User = {};

  constructor(
    private userService: UserService,
    private notifyService: NotifyService,
    private userStore: UserStore
  ) {
    userStore.user.subscribe(user => {
      this.user = user;
    });
  }

  doChange() {
    this.userService.updateUser(this.user).subscribe((user: User) => {
      this.userStore.setUser(user);
      this.notifyService.success('User updated');
    });
  }

}
