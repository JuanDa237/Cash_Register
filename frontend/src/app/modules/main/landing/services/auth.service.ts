import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Models
import { LogInUser } from '../models/index';

// Api
import { environment } from '@enviroment/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl: string;
	private headers: HttpHeaders;

	private token: string;
	private user: string;
	private company: string;
	private rememberedUser: string;

	constructor(private http: HttpClient, private router: Router) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;

		this.token = 'token';
		this.user = 'user';
		this.company = 'company';
		this.rememberedUser = 'rememberedUser';
	}

	// Post
	signIn(user: LogInUser): Observable<any> {
		return this.http.post(this.apiUrl + 'auth/singIn', user, {
			headers: this.headers,
			observe: 'response'
		});
	}

	loggedIn(): boolean {
		return !!localStorage.getItem(this.token); // Verify if exists
	}

	// Auth methods

	setToken(token: string): void {
		localStorage.setItem(this.token, token);
	}

	getToken(): string {
		var token: string | null = localStorage.getItem(this.token);
		return token ? token : '';
	}

	logOut(goHome?: boolean): void {
		localStorage.removeItem(this.token);
		localStorage.removeItem(this.user);
		localStorage.removeItem(this.company);

		if (goHome) {
			this.router.navigate(['/']);
		}
	}

	// Remembered user methods
	getRememberedUser(): LogInUser | null {
		const rememberedUser = localStorage.getItem(this.rememberedUser);
		var user: LogInUser | null = null;

		if (rememberedUser) {
			user = JSON.parse(rememberedUser);
		}

		return user;
	}

	setRememberedUser(user: LogInUser): void {
		console.log('lo guardo', user);
		localStorage.setItem(this.rememberedUser, JSON.stringify(user));
	}

	deleteRememberedUser(): void {
		localStorage.removeItem(this.rememberedUser);
	}
}
