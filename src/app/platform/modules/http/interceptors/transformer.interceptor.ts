import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpOptionsService } from '../services/http-options.service';
import { ITransformParams } from '../interfaces/transform-params.interface';
import { BaseModel } from '../classes/base.model';
import { Request } from '@platform/models/request';

@Injectable()
export class TransformerInterceptor implements HttpInterceptor {
	private params: ITransformParams;

	constructor(
		private httpOptions: HttpOptionsService,
	) {}
    
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<BaseModel>> {
		const params: ITransformParams = this.getParams();
		return next.handle(request)
			.pipe(
				map((res: HttpResponse<any> | {type: number}) => this.transform(res, params)),
			);
	}

	private getParams(): ITransformParams {
		this.params = {
			model: this.httpOptions.model,
			pagination: this.httpOptions.pagination,
		};
		
		return this.params;
	}

	private transform(res: HttpResponse<any> | {type: number}, params: ITransformParams): HttpEvent<BaseModel> {
		if (!params.model || !(res instanceof HttpResponse) || !res.body) {
			if (res instanceof HttpResponse && res.body) {
				const body = new Request(res.body);
				if (!body.success) {
					throw { message: body.message };
				}
			}
			return res;
		}
		
		return this.transformItem(res, params);
	}

	private transformItem(res: HttpResponse<any>, params: ITransformParams) {
		if (!res.body.success) {
			throw { message: res.body.message };
		}
		const body = new Request(res.body, params);

		return res.clone<BaseModel>({
			body: body.data,
		});
	}
}
