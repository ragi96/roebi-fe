/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Log } from '../models/Log';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LogService {

    /**
     * @returns Log Success
     * @throws ApiError
     */
    public static getLog(): CancelablePromise<Array<Log>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Log',
        });
    }

}