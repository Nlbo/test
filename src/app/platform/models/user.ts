
import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { RoleEnum } from '@platform/enums/role';

export class User extends BaseModel {
	
	@Fillable()
	id: number;
	
	@Fillable()
	username: string;

	@Fillable()
	role: RoleEnum;
}
