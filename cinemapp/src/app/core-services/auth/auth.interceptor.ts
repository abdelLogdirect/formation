import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Auth } from './auth.service';

/* `{ providedIn: 'root' }` has been deleted as an interceptor is manually provided in `AppModule` */
// eslint-disable-next-line @angular-eslint/use-injectable-provided-in
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: Auth) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authReq = !this.auth.token ? request : request.clone({
      setHeaders: { Authorization: `Bearer ${this.auth.token}` },
    });

    return next.handle(authReq).pipe(tap(() => {}, (error) => {

      if ((error instanceof HttpErrorResponse) && ((error.status === 401) || (error.status === 403))) {

        this.auth.deauthenticate();

      }

    }));

  }

}
