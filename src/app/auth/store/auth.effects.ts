import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { catchError, switchMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";

import * as AuthActions from './auth.actions';
import { environment } from '../../../environment-app'



export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}
@Injectable()
export class AuthEffects {
    @Effect()

    authLogin =  this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(environment.authLogin,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return of(new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    }))
                }),
                catchError(error => {
                return of()
            }))
        })
        
    )
     

    constructor(
        private actions$: Actions,
        private http: HttpClient
        ) {}
}