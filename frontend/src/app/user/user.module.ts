import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import {NotifyModule} from '@tsmean/toast';

import {LoginService} from './login.service';
import {ApiUrl} from './api-url';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {UserService} from './user.service';
import {UserStore} from './user.store';
import {TokenStorage} from './token.storage';

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatCardModule, HttpModule, NotifyModule.forRoot()],
  declarations: [SignUpComponent, LoginComponent, ProfileComponent],
  exports: [SignUpComponent, LoginComponent, ProfileComponent]
})
export class UserModule {
  static forRoot(apiUrl: string) {
    return {
      ngModule: UserModule,
      providers: [{provide: ApiUrl, useValue: apiUrl}, TokenStorage, LoginService, UserService, UserStore]
    };
  }
}
