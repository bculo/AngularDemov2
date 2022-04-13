import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] LOGIN START';

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
    readonly type: string = LOGIN;
    constructor(public payload: {
        email: string;
        userId: string;
        token: string;
        expirationDate: Date;
    }) {}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    constructor() {}
}

export class LoginStart implements Action {
    readonly type: string = LOGIN_START;

    constructor(public payload: {email: string; password: string;}) {}
}

export type AuthActions = Login | Logout;