import {Component} from '@angular/core';
import {NotifyService} from '@tsmean/toast';

import {UserService} from '../user.service';
import {User} from '../user';
import {UserStore} from '../user.store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User;

  constructor(private userService: UserService, private notifyService: NotifyService, private userStore: UserStore) {
    userStore.user.subscribe(user => {
      this.user = user;
    });
  }

  doChange() {
    this.userService.updateUser(this.user).subscribe(() => {
      this.userStore.setUser(this.user);
      this.notifyService.success('User updated');
    });
  }
}
