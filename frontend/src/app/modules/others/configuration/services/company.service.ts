import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Api
import { environment } from '@enviroment/environment';

import { Company } from '../models';

@Injectable({
	providedIn: 'root'
})
export class CompanyService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	getCompany(): Observable<Company> {
		return this.http.get<Company>(this.apiUrl + 'company', { headers: this.headers });
	}
}
