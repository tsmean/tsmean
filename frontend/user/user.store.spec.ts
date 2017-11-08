import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {LoginService} from './login.service';
import {APP_BASE_HREF} from '@angular/common';
import {ApiUrl} from './api-url';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {AuthGuardService} from './auth-guard.service';
import {NotifyService} from 'notify-angular';
import {RouterModule} from '@angular/router';
import {EmptyComponent} from '../empty/empty.component';
import {User} from './user';
import {ResourceModule} from '@tsmean/resource';
import {UserStore} from './user.store';
import {log} from 'util';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        NotifyService,
        {provide: ApiUrl, useValue: 'bla'},
        { provide: XHRBackend, useClass: MockBackend },
        AuthGuardService,
        LoginService,
        UserService,
        UserStore
      ],
      imports: [
        HttpModule,
        RouterModule.forRoot([
          { path: '', component: EmptyComponent, canActivate: [AuthGuardService]},
          { path: 'dashboard', component: EmptyComponent, canActivate: [AuthGuardService]}
        ]),
        ResourceModule.forRoot('bla')
      ],
      declarations: [
        EmptyComponent
      ]
    });
  });


  it('should be created', inject([UserStore], (service: UserStore) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch the user on load if logged in', inject([UserService, XHRBackend, LoginService, UserStore], (
    userService: UserService, mockBackend: MockBackend, loginService: LoginService, userStore: UserStore) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          data: {
            email: 'hans@gmail.com',
            uid: '1'
          }
        }
      })));
    });
    loginService.logIn('bla', 'blub');
    userService.createUser('bla', 'blub').subscribe((user: User) => {
      expect(user.uid).toEqual('1');
      userStore.setUser(user);
    });
    expect(userStore.user.getValue().uid).toEqual('1');

  }));


});
