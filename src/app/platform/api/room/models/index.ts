import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class RoomsModel extends BaseModel {
  @Fillable()
  name: string;
  @Fillable()
  serviceCount: number;
  @Fillable()
  id: number;

}
