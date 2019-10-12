import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class GetCustomersByGroupModel extends BaseModel {
  @Fillable()
  recordCount: string;
  @Fillable()
  phoneNumber: number;
  @Fillable()
  firstName: number;
  @Fillable()
  groupName: number;
  @Fillable()
  personalPreferences: number;
  @Fillable()
  discount: number;
  @Fillable()
  id: number;
}
