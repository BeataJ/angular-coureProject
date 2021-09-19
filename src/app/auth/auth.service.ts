import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../environment-app";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
       this.http.post(environment.authUrl,
        {
            email,
            password,
            returnSecureToken: true
        }) 
    }
}