import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class BranchesModel extends BaseModel {
  @Fillable()
  name: string;
  @Fillable()
  adminCount: number;
  @Fillable()
  employeeCount: number;
  @Fillable()
  id: number;
}
