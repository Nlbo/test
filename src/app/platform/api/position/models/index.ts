import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class PositionModel extends BaseModel {
  @Fillable()
  name: string;
  @Fillable()
  employeeCount: number;
  @Fillable()
  id: number;
}
