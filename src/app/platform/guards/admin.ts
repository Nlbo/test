import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseAuthGuard } from './base-auth.guard';
import { RoleEnum } from '@platform/enums/role';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard extends BaseAuthGuard {

  protected checkAuthFail(): Observable<boolean> {
    this.router.navigate([ 'auth' ]);
    return of(true);
  }

  protected checkSuccessResponse(): Observable<boolean> | boolean {
    return this.checkRoleOrNavigate([ RoleEnum.Admin ]);
  }
}
