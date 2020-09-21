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
  private apiUri: string;
  private headers: HttpHeaders;

  constructor (
      private http: HttpClient
  ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
  }

  //Get List
  getCompany(): Observable<any> {
      return this.http.get<Array<Company>>(this.apiUri + "company", { headers: this.headers});
  }
}
