import { HttpHeaders } from '@angular/common/http';

export interface IHttpOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: any;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
