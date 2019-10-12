import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HandledError } from '../classes/handled-error';
import { HandlerService } from './handler.service';

@Injectable()
export class ErrorHandlerService extends HandlerService {
    public validStatusCodes: number[] = [404, 403, 401, 402, 422, 415, 491];
    public handle(error: HttpErrorResponse | Error): Observable<HandledError> {
        let res: HandledError;

        if (error instanceof HttpErrorResponse) {
            res = this.handleHttpError(error);
        } else {
            res = this.handleTypeError(error);
        }

        if (!this.httpOptionsService.dontHandleError) {
            this.addNotification(res.toString());
        }
        
        return throwError(res);
    }

    protected handleHttpError(response: HttpErrorResponse): HandledError {
        const err: HandledError = new HandledError(response.status);
        switch (response.status) {
            case 401:
                localStorage.clear();
                location.reload();
                break;
            case 403:
                err.text = response.error.errorMessage;
                break;
            case 422:
                err.text = Object.values(response.error.errors)[0][0];
                break;
        }
        return err;
    }

    protected handleTypeError(error: Error): HandledError {
        console.error(error);
        return new HandledError(undefined, error.message);
    }
}
