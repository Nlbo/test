import { Validation } from '@platform/validation';
import { MinLength } from '@platform/validation/decorators';

export class LoginRM extends Validation {
  @MinLength(3) username: string = '';
  @MinLength(4) password: string = '';

  public errors = {
    username : false,
    password : false,
  };

  public getModel() {
    return {
      email : this.username,
      password : this.password,
    };
  }
}
