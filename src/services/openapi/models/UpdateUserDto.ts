/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type UpdateUserDto = {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    role?: Role;
};