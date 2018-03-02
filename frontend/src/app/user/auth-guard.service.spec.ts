import {TestBed, inject} from '@angular/core/testing';
import {RouterModule, Router} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NotifyModule} from 'notify-angular';

import {AuthGuardService} from './auth-guard.service';
import {LoginService} from './login.service';
import {ApiUrl} from './api-url';
import {TokenStorage} from './token.storage';
import {UserStore} from './user.store';
import {UserModule} from './user.module';
import {UserService} from './user.service';
import {ResourceService} from '../resource/resource.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    const router = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        // FIXME: No provider for InjectionToken Resource.ApiUrl!
        {provide: ApiUrl, useValue: 'bla'},
        {provide: Router, useValue: router},
        {provide: APP_BASE_HREF, useValue: '/'},
        UserStore,
        UserService,
        ResourceService,
        TokenStorage,
        LoginService,
        AuthGuardService
      ],
      imports: [RouterModule.forRoot([]), NotifyModule.forRoot(), HttpClientModule, HttpClientTestingModule]
    });
  });

  it(
    'should be created',
    inject([AuthGuardService], (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should handle states correctly',
    inject(
      [AuthGuardService, LoginService, HttpTestingController],
      (service: AuthGuardService, loginService: LoginService, mockBackend: HttpTestingController) => {
        loginService.logOut();
        expect(service.isAllowedOnState('/dashboard')).toBeFalsy();
        mockBackend.expectOne('').flush({email: 'hans@gmail.com'}, {status: 200});
        loginService.logIn('hans', 'meier');
        expect(service.isAllowedOnState('/dashboard')).toBeTruthy();
      }
    )
  );
});
