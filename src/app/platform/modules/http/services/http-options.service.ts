import { Inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { IHttpOptions } from '../interfaces/http-options.interface';
import { IOptions } from '../interfaces/options.interface';
import { IHttpOptionSharerContract } from '../interfaces/http-option-sharer.interface';

@Injectable()
export class HttpOptionsService {
	private defaultOptions: IHttpOptions = {
		headers: null,
		observe: null,
		params: null,
		reportProgress: null,
		responseType: 'json',
		withCredentials: null,
	};

	private options: IHttpOptions;
	public defaultHeaders = {
		Accept : 'application/json',
	};

	public dontHandleError: boolean;
	public model: any;
	public pagination: boolean;
	public handleSuccessResponse: boolean;
	public errorMessages: {
		[key: number]: string;
	};

	constructor(
		@Inject('HttpOptionSharers') private readonly optionsSharers: IHttpOptionSharerContract[],
	) {
		this.defaultOptions.headers = new HttpHeaders(this.defaultHeaders);
	}

	public getOptions(params?: any, options: IOptions = {}): IHttpOptions {
		this.options = Object.assign({}, this.defaultOptions);
		this.mergeOptions(options);

		this.setParams(params);

		return this.options;
	}

	public setOptions(options: IHttpOptions): void {
		this.options = options;
	}

	private setHeader(name: string, value: string): void {
    this.defaultOptions.headers = this.defaultOptions.headers.set(name, value);
	}

	public setAuth(token: string): void {
		this.setHeader('Authorization', token);
	}

	private mergeOptions(options: IOptions): void {
		for (const i in options) {
			if (this.options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}

		this.dontHandleError = options.dontHandleError;
		this.handleSuccessResponse = options.handleSuccessResponse;
		this.model = options.model;
		this.pagination = options.pagination;

		this.shareOptions(options);

		this.errorMessages = options.errorMessages;
	}

	private shareOptions(options: IOptions): void {
		this.optionsSharers.forEach(sharer => {
			sharer.setOptions(options);
		});
	}

	private setParams(params: any): void {
		this.options.params = params || {};
	}

	public removeAuth(): void {
		if (this.options) {
			this.options.headers.delete('Authorization');
		}
	}
}
