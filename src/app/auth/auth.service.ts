import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions'
import { Store } from '@ngrx/store';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

  signup(email: string, password: string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap((data: AuthResponseData) => {
      this.handleAuthentication(data.email, data.idToken, +data.expiresIn, data.localId);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC0h2mfvOcNlnjFELx8ED_8Ca23o2BZaU",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap((data: AuthResponseData) => {
      this.handleAuthentication(data.email, data.idToken, +data.expiresIn, data.localId);
    }));
  }

  logout() {
    //this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');

    if(!userData){
      return;
    }

    const userParsed: any = JSON.parse(userData); 
    const loadedUser = new User(userParsed.email, userParsed.id, userParsed._token, new Date(userParsed._tokenExpiration));

    if(loadedUser.token) {
      this.store.dispatch(new AuthActions.Login(
        {
          email: userParsed.email, 
          userId: userParsed.id, 
          token: userParsed._token, 
          expirationDate: new Date(userParsed._tokenExpiration)
        })
      );
      //this.user.next(loadedUser);
      this.autoLogout(new Date(userParsed._tokenExpiration).getTime() - new Date().getTime());
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, token: string, expiresIn: number, userId: string) {
    const expiratonDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expiratonDate);
    //this.user.next(user);
    this.store.dispatch(new AuthActions.Login(
      {
        email: user.email, 
        userId: user.id, 
        token: user.token, 
        expirationDate: expiratonDate
      })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(() => new Error(errorMessage));
    }
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email doest not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
