import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "../../environment-app";
import { User } from "./user.model";


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
    user = new BehaviorSubject<User>(null);

    constructor(
        private http: HttpClient,
        private router: Router
        ) {}

    signup(email: string, password: string) {
       return this.http.post<AuthResponseData>(environment.authSignUp,
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                 this.handleAuthentication(
                     resData.email,
                     resData.localId,
                     resData.idToken,
                     +resData.expiresIn
                 )
            })
        ) 
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(environment.authLogin,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
            })
        )
    }

    authLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationData
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return
        }
        
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationData)
        )

        if(loadedUser) {
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }


    private handleAuthentication(email: string,userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        
            let errorMessage = 'An unknowerror occurred!'
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage)
            };

            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct.';
                    break;

            }
            return throwError(errorMessage);
        
    }
}