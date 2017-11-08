import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {MdButtonModule, MdCardModule, MdInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {UserService} from '../user.service';
import {ApiUrl} from '../api-url';
import {HttpModule, XHRBackend} from '@angular/http';

import {NotifyModule, NotifyService} from 'notify-angular';
import {ResourceModule} from '@tsmean/resource';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserStore} from '../user.store';
import {LoginService} from '../login.service';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {EmptyComponent} from '../../empty/empty.component';
import {AuthGuardService} from '../auth-guard.service';
import {MockBackend} from '@angular/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
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
        FormsModule,
        BrowserAnimationsModule,
        MdCardModule,
        MdInputModule,
        MdButtonModule,
        HttpModule,
        RouterModule.forRoot([
          { path: '', component: EmptyComponent, canActivate: [AuthGuardService]},
          { path: 'dashboard', component: EmptyComponent, canActivate: [AuthGuardService]}
        ]),
        ResourceModule.forRoot('bla')
      ],
      declarations: [
        EmptyComponent,
        ProfileComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
