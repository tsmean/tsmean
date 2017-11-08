import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {TopnavComponent} from './topnav/topnav.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingComponent} from './landing/landing.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {SpacerComponent} from './spacer/spacer.component';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatMenuModule,
  MatIconModule
} from '@angular/material';
import 'hammerjs';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NotifyModule } from 'notify-angular';
import { ResourceModule } from '@tsmean/resource';
import {AnimalModule} from '@tsmean/animal';
import {environment} from './main/src/environments/environment';

import {UserModule} from '@tsmean/user-angular/user.module';
import {SpinnerModule} from './spinner/spinner.module';

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
    SpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
