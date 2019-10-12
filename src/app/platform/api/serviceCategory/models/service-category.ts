import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class ServiceCategoryModel extends BaseModel {
  @Fillable()
  name: string;
  @Fillable()
  serviceCount: number;
  @Fillable()
  updatedDate: number;
  @Fillable()
  id: number;
}
