import { IHttpOptions } from './http-options.interface';

export interface IRequestOptions {
    method: string;
    url: string;
    model?: string;
    params?: IHttpOptions;
}
