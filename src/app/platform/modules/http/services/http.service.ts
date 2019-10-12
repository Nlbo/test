import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isBoolean, isNumber } from 'util';

import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../../../../environments/environment';
import { HttpOptionsService } from './http-options.service';
import { SuccessResponseHandlerService } from './success-response-handler.service';
import { IOptions } from '../interfaces';

@Injectable()
export class HttpService {
    
	constructor(
		protected http: HttpClient,
		protected errorHandler: ErrorHandlerService,
		protected successHandler: SuccessResponseHandlerService,
		protected httpOptionsService: HttpOptionsService,
	) { }
	
	public get(url: string, options: IOptions = {}, params?: any): Observable<any> {
		return this.http.get(this.getFullUrl(url), this.httpOptionsService.getOptions(this.prepareParams(params), options))
			.pipe(
				tap(this.handleSuccessResponse.bind(this)),
			);
	}
	
	public post(url: string, options: IOptions = {}, params?: any): Observable<any> {
		return this.http.post(this.getFullUrl(url), params, this.httpOptionsService.getOptions(null, options))
			.pipe(
				tap(this.handleSuccessResponse.bind(this)),
			);
	}
	
	public put(url: string, options: IOptions = {}, params?: any): Observable<any> {
		return this.http.put(this.getFullUrl(url), params, this.httpOptionsService.getOptions(null, options))
			.pipe(
				tap(this.handleSuccessResponse.bind(this)),
			);
	}
	
	public delete(url: string, options: IOptions = {}, params?: any): Observable<any> {
		return this.http.delete(this.getFullUrl(url), this.httpOptionsService.getOptions(this.prepareParams(params), options))
			.pipe(
				tap(this.handleSuccessResponse.bind(this)),
			);
	}
	
	private get baseUrl() {
		return environment.baseUrl;
	}

	private getFullUrl(url: string): string {
		return this.baseUrl + url;
	}
	
	private handleSuccessResponse(res: any): void {
		this.successHandler.handle(res);
	}

	private handleError(error: HttpErrorResponse): Observable<any> {
		return this.errorHandler.handle(error);
	}
	
	private prepareParams(params: any): any {
		for (const i in params) {
			if (isBoolean(params[i]) || isNumber(params[i])) {
				params[i] = params[i].toString();
			}
		}
		
		return params as any;
	}
}
