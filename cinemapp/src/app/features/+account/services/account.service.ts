import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@core/environment';
import { Auth } from '../../../core-services/auth/auth.service';
import { APIData } from '@core/api';

import { RegisterRequestBody, LoginRequestBody, LoginResponse } from './requests.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  /**
   * Send form data to the API
   */
  register(body: RegisterRequestBody): Observable<APIData<boolean>> {

    return this.http.post<APIData<boolean>>(`${environment.apiUrl}/api/v2/account/register`, body);

  }

  /**
   * Send form data to the API, and save auth status on success
   */
  login(body: LoginRequestBody): Observable<APIData<LoginResponse>> {

    return this.http.post<APIData<LoginResponse>>(`${environment.apiUrl}/api/v2/account/login`, body).pipe(
      tap(({ data, error }) => {
        if (!error) {
          this.auth.authenticate(data.token);
        }
      }),
    );

  }

  /**
   * Logout from API and reset auth status on client-side
   */
  logout(): Observable<void> {

    return this.http.post<void>(`${environment.apiUrl}/api/v2/account/logout`, null).pipe(
      tap(() => {
        this.auth.deauthenticate();
      }),
    );

  }

}
