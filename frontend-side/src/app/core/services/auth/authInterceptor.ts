/***************************
 * 
 *This Angular HTTP interceptor automatically manages authentication for outgoing HTTP requests.

**************Its main responsibilities are:

**** Automatically add the JWT Access Token to the Authorization header.
**** Intercept 401 Unauthorized responses.
**** Refresh expired access tokens using the Refresh Token.
**** Retry the original request after token renewal.
**** Log out the user if token refresh fails.

*********/
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take, Subject } from 'rxjs';
import { AuthService } from './auth.service';

let isRefreshing = false;
const refreshDone$ = new Subject<string | null>();

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const platformId  = inject(PLATFORM_ID);

  // SSR : pas de localStorage → on laisse passer sans token
  if (!isPlatformBrowser(platformId)) return next(req);

  // Keycloak endpoints → pas de token
  if (req.url.includes('openid-connect')) return next(req);

  const token = authService.getAccessToken();
  const authReq = token ? addToken(req, token) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) return handle401(req, next, authService);
      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {

  if (!isRefreshing) {
    isRefreshing = true;
    refreshDone$.next(null);

    return authService.refreshToken().pipe(
      switchMap(tokens => {
        isRefreshing = false;
        refreshDone$.next(tokens.access_token);
        return next(addToken(req, tokens.access_token));
      }),
      catchError(err => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  }

  return refreshDone$.pipe(
    filter((token): token is string => token !== null),
    take(1),
    switchMap(token => next(addToken(req, token)))
  );
  
}