import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { GroupModel } from '@api/customerGroup/models/groupModel';
import { GetCustomersByGroupModel } from '@api/customerGroup/models/getCustomersByGroupModel';

@Injectable({
  providedIn: 'root',
})
export class GroupsService extends BaseService {
  public controller: string = 'customerGroup';
  public httpOptions: IOptions = {
  };


  public addGroup(data?: string): Observable<any> {

    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getGroupsList(page?: number, size: number = 10, search = ''): Observable<PaginationWrap<GroupModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}` + (search ? `?name=${search}` : '/'), { model: GroupModel, pagination: true});
  }

  public getCustomersByGroupId(page?: number, size: number = 10, id?: number, search = ''): Observable<PaginationWrap<GetCustomersByGroupModel>> {
    return this.httpClient.get(`${this.controller}/getCustomersByGroupId/${page}/${size}/${id}` + (search ? `?name=${search}` : '/'), { model: GetCustomersByGroupModel, pagination: true});
  }

  public getGroup(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeGroup(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteGroup(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteCustomersByGroupId(id?: number, groupId?: number): Observable<any> {
    return this.httpClient.delete(`${this.controller}/deleteCustomerByCustomerIdAndGroupId/${id}/${groupId}`, { model: null});
  }

}
