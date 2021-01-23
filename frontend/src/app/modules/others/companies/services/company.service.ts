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

	// Get
	getCompanies(): Observable<Company[]> {
		return this.http.get<Company[]>(this.apiUrl + 'companies', { headers: this.headers });
	}

	getAllCompanies(): Observable<Company[]> {
		return this.http.get<Company[]>(this.apiUrl + 'all/companies', { headers: this.headers });
	}

	// Get One
	getCompany(id: number): Observable<Company> {
		return this.http.get<Company>(this.apiUrl + 'company/' + id, { headers: this.headers });
	}

	getMyCompany(): Observable<Company> {
		return this.http.get<Company>(this.apiUrl + 'user/company', { headers: this.headers });
	}

	// Put
	updateCompany(company: CompanyFile): Observable<any> {
		var fd = new FormData();
		fd.append('name', company.name);
		fd.append('ticketMessage', company.ticketMessage);
		fd.append('homeDeliveries', company.homeDeliveries ? 'true' : 'false');
		fd.append('visible', company.visible ? 'true' : 'false');

		if (company.imageFile) fd.append('image', company.imageFile, company.imageFile.name);

		return this.http.put<any>(this.apiUrl + 'company/' + company.id, fd);
	}

	updateMyCompany(company: CompanyFile): Observable<any> {
		var fd = new FormData();
		fd.append('name', company.name);
		fd.append('ticketMessage', company.ticketMessage);
		fd.append('homeDeliveries', company.homeDeliveries ? 'true' : 'false');
		fd.append('visible', company.visible ? 'true' : 'false');

		if (company.imageFile) fd.append('image', company.imageFile, company.imageFile.name);

		return this.http.put<any>(this.apiUrl + 'my/company', fd);
	}

	// Post
	createCompany(company: CompanyFile): Observable<any> {
		var fd = new FormData();
		fd.append('name', company.name);
		fd.append('ticketMessage', company.ticketMessage);
		fd.append('homeDeliveries', company.homeDeliveries ? 'true' : 'false');
		fd.append('visible', company.visible ? 'true' : 'false');

		if (company.imageFile) fd.append('image', company.imageFile, company.imageFile.name);

		return this.http.post<any>(this.apiUrl + 'company', fd);
	}

	//Delete
	deleteCompany(id: number): Observable<any> {
		return this.http.delete<any>(this.apiUrl + 'company/' + id, { headers: this.headers });
	}
}
