import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NotificationMessagesService } from './services/notification-messages.service';
import { HttpOptionSharerService } from './services/http-option-sharer.service';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { TransformerInterceptor } from './interceptors/transformer.interceptor';
import { HttpService } from './services/http.service';
import { SuccessResponseHandlerService } from './services/success-response-handler.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { HttpOptionsService } from './services/http-options.service';
import { NotificationHandlerService } from './services/notification-handler.service';
import { HandlerService } from './services/handler.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    declarations: [],
})
export class HttpModule {
    static forRoot() {
        return {
            ngModule: HttpModule,
            providers: [
                HttpService,
                SuccessResponseHandlerService,
                ErrorHandlerService,
                HttpOptionsService,
                NotificationHandlerService,
                HandlerService,
                {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
                {provide: HTTP_INTERCEPTORS, useClass: TransformerInterceptor, multi: true},
                {provide: 'NotificationHandler', useClass: NotificationHandlerService},
                {provide: 'NotificationMessages', useClass: NotificationMessagesService},
                {provide: 'HttpOptionSharers', useClass: HttpOptionSharerService, multi: true},
            ]
        };
    }
}
