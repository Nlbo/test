import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class TransactionHistory extends BaseModel {
	
	@Fillable('business_id')
	businessId: string;

	@Fillable()
	id: string;
	
	@Fillable('created_at')
	lastUpdate: string;
	
	@Fillable()
	amount: string;

	@Fillable()
	name: string;

	@Fillable()
	image: string;

	@Fillable()
	paid: boolean;
}
