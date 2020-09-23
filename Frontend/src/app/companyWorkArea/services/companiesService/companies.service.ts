import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../global";

//Models
import { Company } from "../../models/company";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  
  private apiUrl: string;
  private headers: HttpHeaders;

  constructor (
      private http: HttpClient
  ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUrl = url;
  }

  //Get List
  getCompany(): Observable<Company> {
    //Whit the token the server know the company
    return this.http.get<Company>(this.apiUrl + "company", { headers: this.headers});
  }
}
