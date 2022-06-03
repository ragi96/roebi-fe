/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdatePatientDto = {
    id?: number;
    lastName?: string | null;
    firstname?: string | null;
    entryStamp?: number;
    exitStamp?: number;
    caseHistory?: string | null;
    room?: number;
};