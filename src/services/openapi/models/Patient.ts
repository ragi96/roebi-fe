/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Room } from './Room';

export type Patient = {
    id?: number;
    lastName?: string | null;
    firstname?: string | null;
    entryStamp?: number;
    exitStamp?: number;
    caseHistory?: string | null;
    room?: Room;
};