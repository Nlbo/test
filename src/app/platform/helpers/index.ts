import { ADMIN_BASE_ROUTE, DEVELOPER_BASE_ROUTE } from '@platform/constants/routes';
import { RoleEnum } from '@platform/enums/role';

export class AppHelper {
  
  static GET_BASE_ROUTE(role: RoleEnum): string {
    switch (role) {
      case RoleEnum.Admin:
        return ADMIN_BASE_ROUTE;
      default:
        return null;
    }
  }

  static GENERATE_ID(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
