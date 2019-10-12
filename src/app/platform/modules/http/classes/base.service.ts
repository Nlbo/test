import { Injectable } from '@angular/core';

import { HttpClient } from '@platform/modules/http/classes/http-client';
import { HttpService } from '@platform/modules/http/services/http.service';
import { IOptions } from '@platform/modules/http/interfaces';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected httpClient: HttpClient;
  abstract httpOptions: IOptions;

	constructor(
    public http: HttpService,
    ) {
    this.httpClient = new HttpClient(this);
  }
  
  protected getQueryWithObj(obj: any): string {
    let query = '';
    Object.keys(obj).forEach((key) => {
      query += `${key}=${obj[key]}&`;
    });
    return query.slice(0, query.length - 1);
  }
}
