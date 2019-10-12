import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOptions } from '@platform/modules/http/interfaces';
import { BaseService } from '@platform/modules/http/classes/base.service';
import { DebtModel } from './models/debt';
import { PaginationWrap } from '@platform/models/pagination-wrap';
import { DebtDetailsWrap } from './models/debt-details-wrap';
import { TransactionHistory } from './models/transaction-history';

@Injectable({
  providedIn: 'root',
})
export class DebtService extends BaseService {
  public controller: string = 'operator/accountant';
	public httpOptions: IOptions = {
	};

	public getList(params?: any): Observable<PaginationWrap<DebtModel>> {
		return this.httpClient.post(`${this.controller}/get-list`, { pagination: true, model: DebtModel }, params);
	}

	public getTransactionHistory(params?: any): Observable<PaginationWrap<TransactionHistory>> {
		return this.httpClient.post(`${this.controller}/get-transactions`, { pagination: true, model: TransactionHistory }, params);
	}

	public getDetails(params?: any): Observable<DebtDetailsWrap> {
		return this.httpClient.post(`${this.controller}/get-list-details`, { model: DebtDetailsWrap }, params);
	}

	public markAsPaid(params?: any): Observable<any> {
		return this.httpClient.post(`${this.controller}/mark-as-paid`, { model: null }, params);
	}
}
