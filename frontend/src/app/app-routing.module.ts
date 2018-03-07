import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './landing/landing.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './user/auth-guard.service';
import {LoginComponent} from './user/login/login.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {ProfileComponent} from './user/profile/profile.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignUpComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]} /* work in progress */,
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
