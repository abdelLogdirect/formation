import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isAuthenticated = false;
  private readonly tokenKey = 'access_token';
  private tokenValue: string | null = null;

  get token(): string | null {
    return this.tokenValue;
  }

  set token(value: string | null) {

    this.tokenValue = value;

    this.isAuthenticated = value ? true : false;

  }

  constructor() {

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
