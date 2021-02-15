import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@enviroment/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
	providedIn: 'root'
})
export class SingUpService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	// Post
	singUpAdmin(user: any): Observable<any> {
		var params = JSON.stringify(user);
		return this.http.post(this.apiUrl + 'auth/singUp/admin', params, {
			headers: this.headers
		});
	}

	singUpCashier(user: any): Observable<any> {
		var params = JSON.stringify(user);
		return this.http.post(this.apiUrl + 'auth/singUp/cashier', params, {
			headers: this.headers
		});
	}
}
