import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import 'hammerjs';
import {SpinnerModule} from '@tsmean/spinner';
import {NotifyModule} from '@tsmean/toast';
import {AppRoutingModule} from './app-routing.module';
import {TopnavComponent} from './topnav/topnav.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingComponent} from './landing/landing.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {SpacerComponent} from './spacer/spacer.component';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserModule} from './user/user.module';
import {AnimalModule} from './animal/animal.module';
import {environment} from '../environments/environment';
import {ResourceModule} from './resource/resource.module';
import {AuthHeaderInterceptor} from './user/auth.http.interceptor';
import {AnimalListModule} from './animal-list/animal-list.module';

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
    HttpClientModule,
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
    AnimalListModule.forRoot(),
    UserModule.forRoot(environment.api),
    SpinnerModule.forRoot({
      animation: 'spin 1s ease-in-out infinite',
      primaryColor: '#3F51B5',
      secondaryColor: '#FF4081'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
