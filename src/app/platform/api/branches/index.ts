import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { PaginationWrap } from '@models/pagination-wrap';
import { BranchesModel } from '@api/branches/models/branchesModel';

@Injectable({
  providedIn: 'root',
})
export class BranchesService extends BaseService {
  public controller: string = 'branch';
  public httpOptions: IOptions = {
  };


  public addBranch(newName?: string): Observable<any> {
    const data = {
      name: newName,
    };
    return this.httpClient.post(`${this.controller}/`, { model: null}, data);
  }

  public getBranchesList(page: number = 1, size: number = 7): Observable<PaginationWrap<BranchesModel>> {
    return this.httpClient.post(`${this.controller}/${page}/${size}`, { model: BranchesModel, pagination: true});
  }

  public getBranch(id?: number): Observable<any> {
    return this.httpClient.get(`${this.controller}/${id}`, { model: null});
  }

  public changeBranch(id?: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this.controller}/${id}`, { model: null}, data);
  }

  public deleteBranch(id?: number, data?: any): Observable<any> {
    return this.httpClient.delete(`${this.controller}/${id}`, { model: null}, data);
  }

}
