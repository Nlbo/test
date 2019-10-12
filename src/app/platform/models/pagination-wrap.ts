
import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class PaginationWrap<T extends BaseModel = BaseModel> extends BaseModel {

	@Fillable('content')
	list: T[];

	@Fillable('totalElements')
	itemCount: number;

	@Fillable('totalPages')
	pageCount: number;

	constructor(data: any, model: typeof BaseModel) {
		super(data);
		this.list = model.transformCollection(this.list);
	}
}
