import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { PositionModel } from '@api/position/models';

@Injectable({
  providedIn: 'root',
})
export class PositionsService extends BaseService {
  public controller: string = 'position';
  public httpOptions: IOptions = {};

  public addBPosition(newName?: string): Observable<any> {
    const data = {
      name: newName,
      branchList: [localStorage.getItem('branch')],

    };
    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getPositionsList(page?: number, size: number = 10): Observable<PaginationWrap<PositionModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}`, { model: PositionModel, pagination: true});
  }

  public getPosition(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changePosition(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deletePosition(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }
}
