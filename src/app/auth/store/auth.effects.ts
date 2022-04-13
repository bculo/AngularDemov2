import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, pipe, catchError, of, map } from 'rxjs';

import * as AuthActions from './auth.actions';


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
  }

export class AuthEffects {



    /*
    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => 
        {
            return this.http
                .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
                {
                  email: authData.payload.email,
                  password: authData.payload.password,
                  returnSecureToken: true
                }
        })
    ));
    */

    /*
    authLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap(action => {
                return this.http.post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    })
             })
        )
    );
    */

    authLogin$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => { 
                return this.http.post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    })
                    .pipe(
                        map(resData => {
                            const expiratonDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
                            return of(new AuthActions.Login({
                                email: resData.email,
                                userId: resData.localId,
                                token: resData.idToken,
                                expirationDate: expiratonDate
                            }));
                        }),
                        catchError(error => {
                            return of();
                        })
                    ) // -> PIPE END
            }) // -> SWITCHMAP END
    )); // -> END
    

    constructor(private actions$: Actions, private http: HttpClient) {}
}