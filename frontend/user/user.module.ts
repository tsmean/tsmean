import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginService} from './login.service';
import {ApiUrl} from './api-url';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NotifyModule} from 'notify-angular';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './user.service';
import {UserStore} from './user.store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    HttpModule,
    NotifyModule.forRoot()
  ],
  declarations: [
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
  ],
  exports: [
    SignUpComponent,
    LoginComponent,
    ProfileComponent
  ]
})
export class UserModule {
  static forRoot(apiUrl: string) {
    return {
      ngModule: UserModule,
      providers: [
        { provide: ApiUrl, useValue: apiUrl },
        LoginService,
        UserService,
        UserStore
      ]
    };
  }
}
