/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Type } from './Type';

export type RoboterLog = {
    id?: number;
    timestamp?: number;
    message?: string | null;
    type?: Type;
};