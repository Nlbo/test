import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { ServiceCategoryModel } from '@api/serviceCategory/models/service-category';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ServicesCategoryService extends BaseService {
  public controller: string = 'serviceCategory';
  public httpOptions: IOptions = {
  };


  public addServiceCategory(newName?: string): Observable<any> {
    const data = {
      name: newName,
      branchList: [localStorage.getItem('branch')],
    };
    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getServiceCategoryList(page?: number, size: number = 10): Observable<PaginationWrap<ServiceCategoryModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}`, { model: ServiceCategoryModel, pagination: true });
  }

  public getServiceCategory(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeServiceCategory(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteServiceCategory(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }

}
