import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth';
import { AppHelper } from '@platform/helpers';
import { RoleEnum } from '@platform/enums/role';

@Injectable()
export abstract class BaseAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkLoginState()
      .pipe(
        map(_ => {
          if (this.authService.getTokenFromStorage()) {
            return this.checkSuccessResponse();
          } else {
            throw new Error();
          }
        }),
        catchError(_ => this.checkAuthFail()),
      );
  }

  protected checkRoleOrNavigate(roles: RoleEnum[]) {
    const user = this.authService.getUser();
    if (roles.includes(user.role)) {
      return true;
    } else {
      this.navigateByRole();
      return of(false);
    }
  }

  protected navigateByRole() {
    const route = AppHelper.GET_BASE_ROUTE(this.authService.getUser().role);
    if (route) {
      this.router.navigate([ route ]);
    } else {
      this.authService.logout();
      this.router.navigate([ 'auth' ]);
    }
  }

  protected abstract checkAuthFail();

  protected abstract checkSuccessResponse();
}
