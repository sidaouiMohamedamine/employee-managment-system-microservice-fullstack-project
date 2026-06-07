// src/app/core/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

export interface TokenResponse {
  access_token:  string;
  refresh_token: string;
  expires_in:    number;
  token_type:    string;
}

export interface UserInfo {
  sub:                string;
  preferred_username: string;
  email:              string;
  realm_access?:      { roles: string[] };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   // Keycloak Configuration
  private readonly tokenUrl     = 'http://localhost:8080/realms/empSec/protocol/openid-connect/token';
  private readonly logoutUrl    = 'http://localhost:8080/realms/empSec/protocol/openid-connect/logout';
  private readonly clientId     = 'empSec';
  private readonly clientSecret = 'yR1G4GdauopVimMqXgpF1lcafkzZZH3q';
  

  private readonly isBrowser: boolean;
  private loggedIn$: BehaviorSubject<boolean>;

  constructor(
    private http:   HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object   
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());
  }

  /******************************* * LOGIN ******************************************************************************************/

  login(username: string, password: string): Observable<TokenResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('grant_type',    'password')
      .set('client_id',     this.clientId)
      .set('client_secret', this.clientSecret)
      .set('username',      username)
      .set('password',      password)
      .set('scope',         'openid profile email');

    return this.http.post<TokenResponse>(this.tokenUrl, body, { headers }).pipe(
      tap(tokens => this.saveTokens(tokens)),
      catchError(err => {
  console.error('=== KEYCLOAK ERROR ===');
  console.error('Status:', err.status);
  console.error('Error:', err.error);
  console.error('Description:', err.error?.error_description);
  const msg = err.error?.error_description ?? err.error?.error ?? 'Invalid credentials';
  return throwError(() => new Error(msg));
      })
    );
  }

  /********************************************************* REFRESH *******************************************************/

  refreshToken(): Observable<TokenResponse> {
    const refresh = this.getRefreshToken();
    if (!refresh) return throwError(() => new Error('No refresh token'));

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('grant_type',    'refresh_token')
      .set('client_id',     this.clientId)
      .set('client_secret', this.clientSecret)
      .set('refresh_token', refresh);

    return this.http.post<TokenResponse>(this.tokenUrl, body, { headers }).pipe(
      tap(tokens => this.saveTokens(tokens))
    );
  }

  /***************************************************** LOGOUT ***********************************************/

  logout(): void {
    const refresh = this.getRefreshToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    if (refresh) {
      const body = new HttpParams()
        .set('client_id',     this.clientId)
        .set('client_secret', this.clientSecret)
        .set('refresh_token', refresh);

      this.http.post(this.logoutUrl, body, { headers }).subscribe({
        complete: () => this.clearSession(),
        error:    () => this.clearSession()
      });
    } else {
      this.clearSession();
    }
  }

  /*********************************************************** STORAGE (SSR-safe) **************************************************/
/***************
 * Utility method used to read, store, or remove data from browser 
 * storage while remaining compatible with Server-Side Rendering (SSR)
 *************/
  private storage(key: string, value?: string | null): string | null {
    if (!this.isBrowser) return null;          
    if (value === null) {
      localStorage.removeItem(key);
      return null;
    }
    if (value !== undefined) {
      localStorage.setItem(key, value);
      return value;
    }
    return localStorage.getItem(key);
  }

/*******
 * Stores authentication tokens and their expiration date in local storage
 *  and updates the authentication state.
******************/  
private saveTokens(tokens: TokenResponse): void {
    this.storage('access_token',  tokens.access_token);
    this.storage('refresh_token', tokens.refresh_token);
    this.storage('expires_at',    String(Date.now() + tokens.expires_in * 1000));
    this.loggedIn$.next(true);
  }
/********************Removes all authentication-related data,
 *  updates the login state, and redirects the user to the login page.
 *********
 */
  private clearSession(): void {
    this.storage('access_token',  null);
    this.storage('refresh_token', null);
    this.storage('expires_at',    null);
    this.loggedIn$.next(false);
    this.router.navigate(['/auth']);
  }

  /************************************** GETTERS **/

  getAccessToken():  string | null { return this.storage('access_token'); }
  getRefreshToken(): string | null { return this.storage('refresh_token'); }
/*******
 **********
 Checks whether an access token exists and is still valid.
 * */
  hasValidToken(): boolean {
    if (!this.isBrowser) return false;         
    const token     = this.getAccessToken();
    const expiresAt = this.storage('expires_at');
    if (!token || !expiresAt) return false;
    return Date.now() < parseInt(expiresAt, 10);
  }

  isLoggedIn():         Observable<boolean> { return this.loggedIn$.asObservable(); }
  isLoggedInSnapshot(): boolean             { return this.loggedIn$.getValue(); }

  getUserInfo(): UserInfo | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1])) as UserInfo;
    } catch {
      return null;
    }
  }
/******************
 * Checks whether the authenticated user has a specific role assigned by Keycloak.
 ******** 
 * ******/
  hasRole(role: string): boolean {
    return this.getUserInfo()?.realm_access?.roles?.includes(role) ?? false;
  }
}