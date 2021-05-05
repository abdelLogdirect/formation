import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineGuard } from '@ngx-pwa/offline';

import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { LogoutPage } from './pages/logout/logout.page';
import { ProfilePage } from './pages/profile/profile.page';
import { RegisterReactivePage } from './pages/register-reactive/register-reactive.page';
import { LoginReactivePage } from './pages/login-reactive/login-reactive.page';
import { AuthGuard } from '@core/auth';

const routes: Routes = [
  { path: 'register', component: RegisterPage, canActivate: [OnlineGuard] },
  { path: 'register-reactive', component: RegisterReactivePage, canActivate: [OnlineGuard] },
  { path: 'login', component: LoginPage, canActivate: [OnlineGuard] },
  { path: 'login-reactive', component: LoginReactivePage, canActivate: [OnlineGuard] },
  { path: 'logout', component: LogoutPage },
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
