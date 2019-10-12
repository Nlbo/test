import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseAuthGuard } from './base-auth.guard';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard extends BaseAuthGuard {
 
  protected checkAuthFail(): Observable<boolean> {
    return of(true);
  }
  
  protected checkSuccessResponse(): boolean {
    this.navigateByRole();
    return false;
  }
}
