import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Api
import { environment } from '@enviroment/environment';

import { User } from '../models';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	getUser(): User {
		var user = localStorage.getItem('loggedUser');
		return JSON.parse(user ? user : '') as User;
	}
}
