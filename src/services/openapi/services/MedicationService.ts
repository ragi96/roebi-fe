/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddMedicationDto } from '../models/AddMedicationDto';
import type { Medication } from '../models/Medication';
import type { UpdateMedicationDto } from '../models/UpdateMedicationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MedicationService {

    /**
     * @returns Medication Success
     * @throws ApiError
     */
    public static getMedication(): CancelablePromise<Array<Medication>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Medication',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postMedication(
requestBody?: AddMedicationDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Medication',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putMedication(
requestBody?: UpdateMedicationDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Medication',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns Medication Success
     * @throws ApiError
     */
    public static getMedication1(
id: number,
): CancelablePromise<Medication> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Medication/{id}',
            path: {
                'id': id,
            },
        });
    }

}