import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface State {
    user: User
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch(action.type){
        case AuthActions.LOGIN:
            const login = action as AuthActions.Login;

            const user = new User(
                login.payload.email,
                login.payload.userId, 
                login.payload.token, 
                login.payload.expirationDate);

            return {
                ...state,
                user: user
            };
        case AuthActions.LOGIN:
            return {
                ...state,
                user: null
            };
        default: return state;
    }
}