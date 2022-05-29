/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoboterLog } from '../models/RoboterLog';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoboterLogService {

    /**
     * @returns RoboterLog Success
     * @throws ApiError
     */
    public static getRoboterLog(): CancelablePromise<Array<RoboterLog>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/RoboterLog',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postRoboterLog(
requestBody?: RoboterLog,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/RoboterLog',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}