import { Injectable } from '@angular/core';

import { IHttpOptionSharerContract } from '../interfaces/http-option-sharer.interface';
import { IOptions } from '../interfaces';

@Injectable()
export class HttpOptionSharerService implements IHttpOptionSharerContract {
  private options: IOptions;
  
  constructor() { }
  
  setOptions(data: any): void {
    this.options = data;
  }
}
