import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Api
import { environment } from '@enviroment/environment';

import { Company, CompanyFile } from '../models';

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

	updateCompany(company: CompanyFile): Observable<any> {
		var fd = new FormData();
		fd.append('name', company.name);
		fd.append('ticketMessage', company.ticketMessage);
		fd.append('visible', company.visible ? 'true' : 'false');

		if (company.imageFile) fd.append('image', company.imageFile, company.imageFile.name);

		return this.http.put<any>(this.apiUrl + 'company', fd);
	}
}
