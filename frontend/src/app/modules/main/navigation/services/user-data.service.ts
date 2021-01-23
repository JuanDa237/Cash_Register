import { Injectable } from '@angular/core';
import { Company } from '@app/modules/others/companies/models';

import { User } from '../models';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	public setUser(user: User): void {
		localStorage.setItem('user', JSON.stringify(user));
	}

	public getUser(): User {
		const user = localStorage.getItem('user');
		return JSON.parse(user ? user : '') as User;
	}

	public setCompany(company: Company): void {
		localStorage.setItem('company', JSON.stringify(company));
	}

	public getCompany(): Company {
		const company = localStorage.getItem('company');
		return JSON.parse(company ? company : '') as Company;
	}
}
