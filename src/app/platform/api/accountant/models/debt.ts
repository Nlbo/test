import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class DebtModel extends BaseModel {

	@Fillable('business_id')
	businessId: string;

	@Fillable('debt_from')
	debtFrom: string;

	@Fillable('last_update')
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
