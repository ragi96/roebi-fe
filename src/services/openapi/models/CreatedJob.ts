/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JobState } from './JobState';
import type { Medication } from './Medication';

export type CreatedJob = {
    id?: number;
    state?: JobState;
    medication?: Array<Medication> | null;
};