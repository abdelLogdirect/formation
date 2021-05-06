import { Injectable } from '@angular/core';
import { Store } from '@core/store';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  // isAuthenticated = new ReplaySubject<boolean>(1);
  private readonly tokenKey = 'access_token';
  private tokenValue: string | null = null;

  get token(): string | null {
    return this.tokenValue;
  }

  set token(value: string | null) {

    this.tokenValue = value;

    // this.isAuthenticated.next(value ? true : false);

    this.store.update({ isAuthenticated: value ? true : false });

  }

  constructor(
    private store: Store,
  ) {

    this.token = localStorage.getItem(this.tokenKey);

  }

  authenticate(token: string): void {

    this.token = token;

    localStorage.setItem(this.tokenKey, token);

  }

  deauthenticate(): void {

    this.token = null;

    localStorage.removeItem(this.tokenKey);

  }

}
