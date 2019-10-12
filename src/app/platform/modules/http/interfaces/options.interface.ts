import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IOptions {
    headers?: HttpHeaders;
    observe?: string;
    params?: HttpParams | any;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    dontHandleError?: boolean;
    handleSuccessResponse?: boolean;
    model?: any;
    pagination?: boolean;
    functionName?: string; // added
    errorMessages?: {
        [key: number]: string
    };
}
