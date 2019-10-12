import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { ServiceModel } from '@api/services/models/service-category';
import { RoomsModelSerialized } from '@api/services/models/RoomsModelSerialized';
import { SelectModel } from '@models/select';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends BaseService {
  public controller: string = 'service';
  public httpOptions: IOptions = {
  };

  timeList: SelectModel[] = [
    new SelectModel('10 мин', 10),
    new SelectModel('20 мин', 20),
    new SelectModel('30 мин', 30),
    new SelectModel('40 мин', 40),
    new SelectModel('50 мин', 50),
    new SelectModel('60 мин', 60),
    new SelectModel('70 мин', 70),
    new SelectModel('80 мин', 80),
    new SelectModel('90 мин', 90),
    new SelectModel('100 мин', 100),
    new SelectModel('110 мин', 100),
    new SelectModel('120 мин', 100),
  ];

  durationList: SelectModel[] = [
    new SelectModel('10', 10),
    new SelectModel('20', 20),
    new SelectModel('30', 30),
    new SelectModel('40', 40),
    new SelectModel('50', 50),
    new SelectModel('60', 60),
    new SelectModel('70', 70),
    new SelectModel('80', 80),
    new SelectModel('90', 90),
    new SelectModel('100', 100),
    new SelectModel('110', 100),
    new SelectModel('120', 100),
  ];

  maxCount: SelectModel[] = [
    new SelectModel('5', 5),
    new SelectModel('10', 10),
    new SelectModel('15', 15),
    new SelectModel('20', 20),
    new SelectModel('30', 30),
    new SelectModel('40', 40),
    new SelectModel('60', 60),
  ];


  public addService(data?: string, id?: string): Observable<any> {

    return this.httpClient.post(`${this.controller}/?categoryId=${id}`, { model: null}, data);
  }

  public getServiceList(page?: number, size: number = 10, id?: number, search: string = ''): Observable<PaginationWrap<ServiceModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}/${id}` + (search ? `?name=${search}` : '/'), { model: ServiceModel, pagination: true});
  }

  public getService(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeService(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteService(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }


}
