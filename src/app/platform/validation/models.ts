import { ValidationTypes } from './enums';

export interface IValidationArgsModel {
  type: ValidationTypes;
  target: Object;
  propertyName: string;
  constraints?: any[];
}
