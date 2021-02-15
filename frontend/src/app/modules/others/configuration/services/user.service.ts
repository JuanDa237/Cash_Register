import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '@enviroment/environment';
import { User } from '@app/modules/main/navigation/models';
import { Company } from '../../companies/models';

interface UserCompany {
	user: User;
	company: Company;
}

interface UserToUpdate {
	id: number;
	name: string;
	username: string;
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	// Get One
	getUser(): Observable<User> {
		return this.http.get<User>(this.apiUrl + 'user', { headers: this.headers });
	}

	getUserCompany(): Observable<UserCompany> {
		return this.http.get<UserCompany>(this.apiUrl + 'all/user', { headers: this.headers });
	}

	getCompany(): Observable<Company> {
		return this.http.get<Company>(this.apiUrl + 'user/company', { headers: this.headers });
	}

	// Get List
	getAdmins(): Observable<any[]> {
		return this.http.get<any[]>(this.apiUrl + 'users/admins', { headers: this.headers });
	}

	getCashiers(): Observable<User[]> {
		return this.http.get<User[]>(this.apiUrl + 'users/cashiers', { headers: this.headers });
	}

	// Put
	updateUser(user: UserToUpdate): Observable<any> {
		var params = JSON.stringify(user);
		return this.http.put(this.apiUrl + 'user/' + user.id, params, {
			headers: this.headers
		});
	}

	// Delete
	deleteUser(id: number): any {
		return this.http.delete<any>(this.apiUrl + 'user/' + id, { headers: this.headers });
	}
}
