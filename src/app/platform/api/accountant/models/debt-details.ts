import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class DebtDetails extends BaseModel {
	
	@Fillable()
	id: number;

	@Fillable()
	code: string;

	@Fillable('business_id')
	businessId: string;
	
	@Fillable('wallet_transaction_id')
	walletTransactionId: number;
	
	@Fillable()
	amount: number;

	@Fillable()
	name: string;

	@Fillable()
	image: string;

	@Fillable('created_at')
	createdAt: string;
}
