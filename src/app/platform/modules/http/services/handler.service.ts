import { Inject, Injectable } from '@angular/core';

import { HttpOptionsService } from './http-options.service';
import { NotificationMessagesService } from './notification-messages.service';
import { ToasterService } from '../../toaster/services/toaster.service';
import { ToasterEnum } from '../../toaster/enums/toaster-type.enum';
import { Toaster } from '../../toaster/models/toaster.model';

@Injectable()
export class HandlerService {
    constructor(
        protected httpOptionsService: HttpOptionsService,
        protected toasterService: ToasterService,
        @Inject('NotificationMessages') protected notificationMessages: NotificationMessagesService,
    ) {}
    
    protected addNotification(text: string, type: ToasterEnum = ToasterEnum.Error): void {
        const toaster = new Toaster({
            status: type,
            text,
        });
        this.toasterService.toaster.next(toaster);
    }
}
