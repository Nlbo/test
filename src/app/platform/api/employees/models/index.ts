import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class EmployeesModel extends BaseModel {
  @Fillable()
  imageUrl: string;
  @Fillable()
  firstName: number;
  @Fillable()
  lastName: number;
  @Fillable()
  phoneNumber: number;
  @Fillable()
  positionName: number;
  @Fillable()
  dateOfReceipt: number;
  @Fillable()
  id: number;
}
