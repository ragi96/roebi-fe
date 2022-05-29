/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type AuthenticateResponse = {
    id?: number;
    role?: Role;
    token?: string | null;
};