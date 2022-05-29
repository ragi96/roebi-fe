/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Room } from '../models/Room';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomService {

    /**
     * @returns Room Success
     * @throws ApiError
     */
    public static getRoom(): CancelablePromise<Array<Room>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Room',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postRoom(
requestBody?: Room,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Room',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putRoom(
requestBody?: Room,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Room',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns Room Success
     * @throws ApiError
     */
    public static getRoom1(
id: number,
): CancelablePromise<Room> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Room/{id}',
            path: {
                'id': id,
            },
        });
    }

}