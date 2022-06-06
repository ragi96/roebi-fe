/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddUserDto } from '../models/AddUserDto';
import type { AuthenticateRequest } from '../models/AuthenticateRequest';
import type { AuthenticateResponse } from '../models/AuthenticateResponse';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody 
     * @returns AuthenticateResponse Success
     * @throws ApiError
     */
    public static postUserAuthenticate(
requestBody?: AuthenticateRequest,
): CancelablePromise<AuthenticateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/User/Authenticate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns User Success
     * @throws ApiError
     */
    public static getUserCurrent(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User/current',
        });
    }

    /**
     * @returns User Success
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putUser(
requestBody?: User,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postUser(
requestBody?: AddUserDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putCurrent(
requestBody?: UpdateUserDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/current',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns User Success
     * @throws ApiError
     */
    public static getUser1(
id: number,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User/{id}',
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
    public static deleteUser(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/User/{id}',
            path: {
                'id': id,
            },
        });
    }

}