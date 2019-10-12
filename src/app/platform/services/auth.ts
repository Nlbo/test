import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

import { IHttpServiceContract } from '../modules/http/interfaces/http-service-contract';
import { HttpClient } from '../modules/http/classes/http-client';
import { HttpService } from '../modules/http/services/http.service';
import { HttpOptionsService } from '../modules/http/services/http-options.service';
import { User } from '../models/user';
import { Token } from '@platform/models/token';
import { HttpClient as HttpClient2 } from '@angular/common/http';
import { RoleEnum } from '@platform/enums/role';
import { LoginRM } from '@models/login-rm';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IHttpServiceContract {
  private user: User;
  private readonly storageTokenKey: string = 'token';
  public loggedInState = new BehaviorSubject<boolean>(undefined);
  public httpOptions = {
    model: Token,
  };

  private httpClient: HttpClient;

  constructor(
    public http: HttpService,
    private httpOptionsService: HttpOptionsService,
    private httpClient2: HttpClient2,

) {
    this.httpClient = new HttpClient(this);
    this.setAuth(this.getTokenFromStorage());
  }






  public login(data: LoginRM): Observable<User> {
    return this.httpClient.post('token/signIn', undefined, data.getModel())
      .pipe(
        tap((res: Token) => {
          this.setAuth(res.token);
          this.saveTokenInStorage(res.token);
        }),
        switchMap(() => {
          return this.checkUser();
        }),
      );
  }

  private setAuth(token: string): void {
    if (token) {
      this.httpOptionsService.setAuth('Bearer ' + token);
    }
  }

  private loginStateFromSubject(): Observable<User> {
    if (this.loggedInState.getValue()) {
      return of(this.user);
    }

    return throwError(this.user);
  }

  public checkLoginState(): Observable<User> {
    if (this.loggedInState.getValue() !== undefined) {
      return this.loginStateFromSubject();
    }

    return this.checkUser();
  }

  public checkUser(): Observable<User> {
    if (this.getTokenFromStorage()) {
      return this.httpClient.get(`admin/getUserDetails`, {model: User, dontHandleError: true})
        .pipe(
          tap((user: User) => this.setUser(user)),
          catchError(_ => {
            this.removeAuth();
            return throwError(false);
          }),
        );
    } else {
      this.removeAuth();
      return throwError(false);
    }
  }

  private setUser(user: User): void {
    this.user = user;
    this.user.role = RoleEnum.Admin; // TODO -> remove this line

    this.setLoginState(true);
  }

  public logout(): void {
    this.removeAuth();
  }

  private saveTokenInStorage(token: string): void {
    localStorage.setItem(this.storageTokenKey, token);
  }

  public getTokenFromStorage(): string {
    return localStorage.getItem(this.storageTokenKey);
  }

  public removeUserStorage(): void {
    this.user = null;
  }

  private removeTokenStorage(): void {
    localStorage.removeItem(this.storageTokenKey);
  }

  private removeAuth(): void {
    this.user = null;
    this.removeTokenStorage();
    this.setLoginState(false);
    this.httpOptionsService.removeAuth();
  }

  public setLoginState(value: boolean): void {
    this.loggedInState.next(value);
  }

  public getUser(): User {
    return this.user;
  }
}
