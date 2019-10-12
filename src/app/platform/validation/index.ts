import { storage } from './storage';

export abstract class Validation {

  abstract errors: any;

  public validate(): boolean {
    const arr = storage.validate(this);
    Object.keys(this.errors).forEach(key => this.errors[key] = false);
    arr.forEach(x => this.errors[x] = true);

    return !arr.length;
  }
}
