import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { RoomsModel } from '@api/room/models';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends BaseService {
  public controller: string = 'room';
  public httpOptions: IOptions = {};

  public addBRoom(newName?: string): Observable<any> {
    const data = {
      name: newName,
    };
    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getRoomsList(page?: number, size: number = 10): Observable<PaginationWrap<RoomsModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}`, { model: RoomsModel, pagination: true});
  }

  public getRoom(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeRoom(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteRoom(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }
}
