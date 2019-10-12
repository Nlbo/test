
import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { RoleEnum } from '@platform/enums/role';

export class Token extends BaseModel {

	@Fillable()
	token: string;

  @Fillable()
  role: RoleEnum;
}
