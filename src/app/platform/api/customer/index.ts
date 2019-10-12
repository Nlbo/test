import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { CustomerModel } from '@api/customer/models/customerModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  public controller: string = 'customer';
  public httpOptions: IOptions = {
  };


  public addCustomer(data?: string): Observable<any> {

    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getCustomersList(page?: number, size: number = 10, search = ''): Observable<PaginationWrap<CustomerModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}` + (search ? `?name=${search}` : '/'), { model: CustomerModel, pagination: true});
  }

  public getCustomer(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeCustomer(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteCustomer(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }

}
