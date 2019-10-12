import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HandledError } from '../classes/handled-error';
import { HttpOptionsService } from '../services/http-options.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private httpOptions: HttpOptionsService,
        private errorHandler: ErrorHandlerService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HandledError>> {
        return next.handle(request)
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    private handleError(error: HttpErrorResponse): Observable<HandledError> {
        return this.errorHandler.handle(error);
    }
}
