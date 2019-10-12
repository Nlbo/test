import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class RoomsModelSerialized extends BaseModel {
  @Fillable()
  name: string;
  @Fillable('id')
  value: number;
}
