import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

import { url } from "../../../companyWorkArea/services/global";

interface User {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUri: string;
  private headers: HttpHeaders;

  constructor (
      private http: HttpClient,
      private router: Router
  ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
  }

  //Post
  signIn(user: User): Observable<any> {
    return this.http.post(this.apiUri + "authentication/singIn", user, { headers: this.headers, observe: "response" });
  }

  loggedIn(): boolean {

    return !!localStorage.getItem("token"); //Verify if exists
  }

  getToken(): string {

    return localStorage.getItem("token");
  }

  logOut(redirection: boolean) {
    
    localStorage.removeItem("token");

    if(redirection) {
      this.router.navigate(["/home"]);
    }
  }
}
