import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {RouterModule, Router} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {LoginService} from './login.service';
import {ApiUrl} from './api-url';
import {NotifyModule} from 'notify-angular';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';

describe('AuthGuardService', () => {
  beforeEach(() => {

    const router = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: ApiUrl, useValue: 'bla'},
        { provide: XHRBackend, useClass: MockBackend },
        AuthGuardService,
        LoginService,
        LoginService,
        AuthGuardService

      ],
      imports: [
        RouterModule.forRoot([]),
        NotifyModule.forRoot(),
        HttpModule
      ]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle states correctly', inject([AuthGuardService, LoginService, XHRBackend], (
    service: AuthGuardService, userService: LoginService, mockBackend: MockBackend) => {
    userService.logOut();
    expect(service.isAllowedOnState('/dashboard')).toBeFalsy();
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          email: 'hans@gmail.com'
        }
      })));
    });
    userService.logIn('hans', 'meier');
    expect(service.isAllowedOnState('/dashboard')).toBeTruthy();
  }));

});
