import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class Documents extends BaseModel {
	
	@Fillable()
	document: string;
	
	@Fillable('document_id')
	documentId: number;
}
