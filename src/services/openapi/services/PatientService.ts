/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddPatientDto } from '../models/AddPatientDto';
import type { Patient } from '../models/Patient';
import type { UpdatePatientDto } from '../models/UpdatePatientDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientService {

    /**
     * @returns Patient Success
     * @throws ApiError
     */
    public static getPatient(): CancelablePromise<Array<Patient>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Patient',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postPatient(
requestBody?: AddPatientDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putPatient(
requestBody?: UpdatePatientDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns Patient Success
     * @throws ApiError
     */
    public static getPatient1(
id: number,
): CancelablePromise<Patient> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Patient/{id}',
            path: {
                'id': id,
            },
        });
    }

}