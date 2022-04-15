import { createAction, props } from "@ngrx/store";

export const authenticateSuccess = createAction(
    '[Auth] AUTHENTICATE SUCCESS',
    props<{
        email: string;
        userId: string;
        token: string;
        expirationDate: Date;
        redirect: boolean;
    }>()
);

export const signupStart = createAction(
    '[Auth] SIGNUP START',
    props<{
        email: string; 
        password: string;
    }>()
);

export const authenticateFail = createAction(
    '[Auth] AUTHENTICATE FAIL',
    props<{
        errorMessage: string;
    }>()
);

export const logut = createAction(
    '[Auth] LOGOUT'
);

export const loginStart = createAction(
    '[Auth] LOGIN START',
    props<{
        email: string; 
        password: string;
    }>()
);

export const clearError = createAction(
    '[Auth] CLEAR ERROR', 
);

export const autoLogin = createAction(
    '[Auth] AUTO LOGIN'
);
