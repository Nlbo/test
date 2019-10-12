import { Injectable } from '@angular/core';
import { INotification } from '../interfaces/notification.interface';
import { INotificationHandlerContract } from '../interfaces';

@Injectable()
export class NotificationHandlerService implements INotificationHandlerContract {
    constructor() {
    }
    
    public addMessage(message: INotification): void {
    }
}
