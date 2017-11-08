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
        UserService
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


  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to create a user', inject([UserService, XHRBackend], (
    service: UserService, mockBackend: MockBackend) => {

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

    service.createUser('bla', 'blub').subscribe((user: User) => {
      expect(user.uid).toEqual('1');
      expect(user.email).toEqual('hans@gmail.com');
    });
  }));

  it('should be able to get user', inject([UserService, XHRBackend], (
    service: UserService, mockBackend: MockBackend) => {

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

    service.getUser().subscribe((user: User) => {
      expect(user.uid).toEqual('1');
      expect(user.email).toEqual('hans@gmail.com');
    });

  }));

  it('should be able to update a user', inject([UserService, XHRBackend], (
    service: UserService, mockBackend: MockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          data: {
            email: 'britney@gmail.com',
            uid: '1'
          }
        }
      })));
    });

    service.updateUser({
      email: 'britney@gmail.com',
      uid: '1'
    }).subscribe((user: User) => {
      expect(user.uid).toEqual('1');
      expect(user.email).toEqual('britney@gmail.com');
    });

  }));


});
