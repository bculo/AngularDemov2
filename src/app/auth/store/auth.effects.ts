import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, pipe, catchError, of, map, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
};

const handleAuthentication = (email: string, token: string, expiresIn: number, userId: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({ email, userId, token, expirationDate, redirect: true});
}


const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return AuthActions.authenticateFail({errorMessage});
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return AuthActions.authenticateFail({errorMessage});
};


@Injectable()
export class AuthEffects {

    authLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap(action => {
                return this.http.post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
                    {
                      email: action.email,
                      password: action.password,
                      returnSecureToken: true
                    }
                )
                .pipe(
                    tap(data => this.authService.setLogoutTimer(+data.expiresIn * 1000)),
                    map(response => {
                        return handleAuthentication(
                          response.email,
                          response.idToken,
                          +response.expiresIn,
                          response.localId,                         
                        );
                    }),
                    catchError(errorRes => {
                        return of(handleError(errorRes));
                    })
                );
            }) 
        ) 
    ); 
    
    authRedirect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.authenticateSuccess),
            tap((data) => {
                if(data.redirect) this.route.navigate(['/']);
            })
        ),             
        { dispatch: false }
    );

    authSignup$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.signupStart),
            switchMap(signUpAction => {
                return this.http.post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
                    {
                      email: signUpAction.email,
                      password: signUpAction.password,
                      returnSecureToken: true
                    }
                )
                .pipe(
                    tap(data => this.authService.setLogoutTimer(+data.expiresIn * 1000)),
                    map(response => {
                        return handleAuthentication(response.email, response.idToken, +response.expiresIn, response.localId)
                    }),
                    catchError(error => {
                        return of(handleError(error));
                    })
                )
            })
        )
    );

    authLogout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.logut),
            tap(() => { 
                localStorage.removeItem('userData');
                this.authService.clearLogoutTimter(); 
                this.route.navigate(['/auth']);
            })
        ),
        { dispatch: false }
    );

    autoLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            map(() => {
                const userData = localStorage.getItem('userData');

                if(!userData){
                  return { type: 'EMPTY' };
                }
            
                const userParsed: any = JSON.parse(userData); 
                const loadedUser = new User(userParsed.email, userParsed.id, userParsed._token, new Date(userParsed._tokenExpiration));
            
                if(loadedUser.token) {
                    console.log()
                    const expirationDuration = new Date(userParsed._tokenExpiration).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return AuthActions.authenticateSuccess(
                    {                       
                        email: userParsed.email, 
                        userId: userParsed.id, 
                        token: userParsed._token, 
                        expirationDate: new Date(userParsed._tokenExpiration),
                        redirect: false,
                    })
                }

                return { type: 'EMPTY' };
            })
        )
    );

    constructor(private actions$: Actions,
        private http: HttpClient, 
        private route: Router,
        private authService: AuthService) {}
}