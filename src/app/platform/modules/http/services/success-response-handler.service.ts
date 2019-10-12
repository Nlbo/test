import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { ToasterEnum } from '../../toaster/enums/toaster-type.enum';

@Injectable({
  providedIn: 'root',
})
export class SuccessResponseHandlerService extends HandlerService {
    public handle(res: any): void {
        if (this.httpOptionsService.handleSuccessResponse) {
            this.addNotification(res[0], ToasterEnum.Success);
        }
    }
}
