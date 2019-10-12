import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class ServiceModel extends BaseModel {
  @Fillable()
  name: string;
  @Fillable()
  duration: number;
  @Fillable()
  price: number;
  @Fillable()
  id: number;
  @Fillable()
  fixedDuration: boolean;
  // @Fillable()
  // fixedPrice: number;
  // fromDuration: number;
  // fromPrice: number;
  // maxCount: number;
  // roomId: number;
  // toDuration: any;
  // toPrice: any;
}
