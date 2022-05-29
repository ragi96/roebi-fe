/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedJob } from '../models/CreatedJob';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JobsService {

    /**
     * @returns CreatedJob Success
     * @throws ApiError
     */
    public static getJobs(): CancelablePromise<CreatedJob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Jobs',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static getJobsStateStarted(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Jobs/{id}/state-started',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static getJobsStateFinished(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Jobs/{id}/state-finished',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static getJobsStateFailed(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Jobs/{id}/state-failed',
            path: {
                'id': id,
            },
        });
    }

}