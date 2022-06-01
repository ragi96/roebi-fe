/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type AuthenticateResponse = {
    id?: number;
    user?: User;
    token?: string | null;
};