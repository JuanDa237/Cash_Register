import { Injectable } from '@angular/core';

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
