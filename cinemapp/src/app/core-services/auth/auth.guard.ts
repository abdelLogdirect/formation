import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@core/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return this.auth.isAuthenticated || this.router.parseUrl('/account/login');

    return this.store.selectOnce('isAuthenticated').pipe(
      map((isAuthenticated) => isAuthenticated || this.router.parseUrl('/account/login')),
    );

  }

}
