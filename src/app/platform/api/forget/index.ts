import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';

@Injectable({
  providedIn: 'root',
})
export class ForgetService extends BaseService {
  public controller: string = 'forget';
  public httpOptions: IOptions = {};

  public sendEmail(mail?: string): Observable<any> {
    const data = {
      email: mail,
    };
    return this.httpClient.post(`${this.controller}/sendEmail`, {model: null}, data);
  }

  public verifyCode(data?: any): Observable<any> {
    return this.httpClient.post(`${this.controller}/verifyCode`, {model: null}, data);
  }

  public changePassword(data?: any): Observable<any> {
    return this.httpClient.post(`${this.controller}/resetPassword`, {model: null}, data);
  }
}
