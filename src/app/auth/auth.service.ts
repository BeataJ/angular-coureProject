import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

// import { User } from "./user.model";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


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
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(
        private store: Store<fromApp.AppState>
        ) {}

    
    setLogoutTimer(exprationDuration) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        } , exprationDuration)
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}