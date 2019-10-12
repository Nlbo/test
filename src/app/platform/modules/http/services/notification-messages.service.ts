import { Injectable } from '@angular/core';

@Injectable()
export class NotificationMessagesService {
    public messages = {
        401: 'Unauthorized',
        402: 'Payment Required',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
    };
}
