import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AccountRoutingModule } from './account-routing.module';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { LogoutPage } from './pages/logout/logout.page';
import { ProfilePage } from './pages/profile/profile.page';
import { RegisterReactivePage } from './pages/register-reactive/register-reactive.page';
import { LoginReactivePage } from './pages/login-reactive/login-reactive.page';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { EmailComponent } from './components/email/email.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { CityComponent } from './components/city/city.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    TextFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    AccountRoutingModule,
  ],
  declarations: [
    RegisterPage,
    LoginPage,
    LogoutPage,
    ProfilePage,
    RegisterReactivePage,
    LoginReactivePage,
    PasswordsComponent,
    EmailComponent,
    ErrorsComponent,
    ReservationsListComponent,
    CityComponent,
  ],
})
export class AccountModule {}
