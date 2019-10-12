import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends BaseService {
  public controller: string = 'client';
  public httpOptions: IOptions = {
  };


  public addClient(newName?: string): Observable<any> {
    const data = {
      name: newName,
    };
    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getClientsList(page?: number, size: number = 10, search = ''): Observable<any> {
    return this.httpClient.post(`${this.controller}/${page}/${size}` + (search ? `?name=${search}` : '/'), { model: null});
  }

  public getClient(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeClient(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteClient(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }

}
