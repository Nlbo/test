import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class GroupModel extends BaseModel {
  @Fillable()
  name: string;
  @Fillable()
  discount: number;
  @Fillable()
  id: number;
}
