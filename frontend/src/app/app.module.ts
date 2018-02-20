import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {TopnavComponent} from './topnav/topnav.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingComponent} from './landing/landing.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {SpacerComponent} from './spacer/spacer.component';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule} from '@angular/material';
import 'hammerjs';
import {DashboardComponent} from './dashboard/dashboard.component';

import {NotifyModule} from 'notify-angular';

import {UserModule} from './user/user.module';
import {AnimalModule} from './animal/animal.module';
import {environment} from '../environments/environment';
import {ResourceModule} from './resource/resource.module';

import {SpinnerModule} from 'spinner-angular';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    PageNotFoundComponent,
    LandingComponent,
    JumbotronComponent,
    SpacerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    NotifyModule.forRoot(),
    ResourceModule.forRoot(environment.api),
    AnimalModule.forRoot(),
    UserModule.forRoot(environment.api),
    SpinnerModule.forRoot({
      animation: 'spin 1s ease-in-out infinite',
      primaryColor: '#3F51B5',
      secondaryColor: '#FF4081'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
