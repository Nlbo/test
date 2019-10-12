import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { DebtDetails } from './debt-details';
import { Model } from '@platform/decorators/model.decorator.ts';
import { IsArray } from '@platform/decorators/is-array.decorator';

export class DebtDetailsWrap extends BaseModel {
	
	@Fillable()
	@Model(DebtDetails)
	@IsArray()
	list: DebtDetails[];
}
