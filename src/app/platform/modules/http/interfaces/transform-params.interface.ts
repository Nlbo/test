import { BaseModel } from '../classes/base.model';

export interface ITransformParams {
    model: typeof BaseModel;
    pagination: boolean;
}
