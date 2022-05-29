/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Job } from './Job';
import type { Medicine } from './Medicine';
import type { Patient } from './Patient';

export type Medication = {
    id?: number;
    medicine: Medicine;
    patient: Patient;
    takingStamp: number;
    job?: Job;
};