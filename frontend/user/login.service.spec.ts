import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import {ApiUrl} from './api-url';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {MockBackend, MockConnection} from '@angular/http/testing';
import {NotifyService} from 'notify-angular';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {AuthGuardService} from './auth-guard.service';
import {EmptyComponent} from '../empty/empty.component';

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
      ],
      imports: [
        HttpModule,
        RouterModule.forRoot([
          { path: '', component: EmptyComponent, canActivate: [AuthGuardService]},
          { path: 'dashboard', component: EmptyComponent, canActivate: [AuthGuardService]}
        ])
      ],
      declarations: [
        EmptyComponent
      ]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should able to log out and check loggedIn status', inject([LoginService], (service: LoginService) => {
   service.logOut();
    expect(service.loggedIn()).toBeFalsy();
  }));

  it('should be able to login without throwing an exception',
    inject([LoginService, XHRBackend],
      (loginService: LoginService, mockBackend: MockBackend) => {

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              email: 'hans@gmail.com'
            }
          })));
        });

        /* this works because the mock backend is synchronous! */
        loginService.logIn('hans@gmail.com', '1234');
        expect(loginService.loggedIn()).toBeTruthy();

      })
  );


});
