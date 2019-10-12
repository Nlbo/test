import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { EmployeesModel } from '@api/employees/models';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends BaseService {
  public controller: string = 'employee';
  public httpOptions: IOptions = {
  };


  public addEmployees(newName?: string): Observable<any> {
    const data = {
      name: newName,
    };
    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getEmployeesList(page?: number, size: number = 10 , search = ''): Observable<PaginationWrap<EmployeesModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}` + (search ? `?name=${search}` : '/'), { model: EmployeesModel, pagination: true});
  }

  public getEmployees(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeEmployees(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteEmployees(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }

}
