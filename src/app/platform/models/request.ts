
import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { isObject } from 'util';
import { ITransformParams } from '@platform/modules/http/interfaces/transform-params.interface';
import { PaginationWrap } from './pagination-wrap';

export class Request extends BaseModel {
	
	@Fillable()
	success: boolean;
	
	@Fillable()
	data: any;
	
	@Fillable()
	message: string;

	constructor(data: any, params?: ITransformParams) {
		super(data);
		
		if (params) {
			if (!params.pagination) {
				if (!Array.isArray(data.data)) {
					this.data = params.model.transform(data.data);
				} else {
					this.data = params.model.transformCollection(data.data);
				}
			} else {
				this.data = new PaginationWrap(data.data, params.model);
			}
		}
	}
}
