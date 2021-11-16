import { Actions, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import { HttpClient} from "@angular/common/http";

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

export class AuthEffects {
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(environment.authLogin,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            )
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient
        ) {}
}