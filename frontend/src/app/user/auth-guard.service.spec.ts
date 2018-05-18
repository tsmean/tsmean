import {inject, TestBed} from '@angular/core/testing';
import {Router, RouterModule} from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {LoginService} from './login.service';

class LoginServiceMock {
  private _loggedIn = false;

  logIn(email, password) {
    this._loggedIn = true;
  }

  logOut() {
    this._loggedIn = false;
  }

  loggedIn() {
    return this._loggedIn;
  }
}

describe('AuthGuardService', () => {
  beforeEach(() => {
    const router = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: router},
        {provide: LoginService, useClass: LoginServiceMock},
        AuthGuardService
      ],
      imports: [
        RouterModule.forRoot([])
      ]
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
      [AuthGuardService, LoginService],
      (service: AuthGuardService, loginService: LoginServiceMock) => {
        loginService.logOut();
        expect(service.isAllowedOnState('/dashboard')).toBeFalsy();
        loginService.logIn('hans', 'meier');
        expect(service.isAllowedOnState('/dashboard')).toBeTruthy();
      }
    )
  );

});
