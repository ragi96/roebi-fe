/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Medicine } from '../models/Medicine';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MedicineService {

    /**
     * @returns Medicine Success
     * @throws ApiError
     */
    public static getMedicine(): CancelablePromise<Array<Medicine>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Medicine',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postMedicine(
requestBody?: Medicine,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Medicine',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putMedicine(
requestBody?: Medicine,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Medicine',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns Medicine Success
     * @throws ApiError
     */
    public static getMedicine1(
id: number,
): CancelablePromise<Medicine> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Medicine/{id}',
            path: {
                'id': id,
            },
        });
    }

}