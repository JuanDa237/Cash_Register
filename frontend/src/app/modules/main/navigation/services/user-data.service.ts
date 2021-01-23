import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Company, createEmptyCompany } from '@app/modules/others/companies/models';
import { User } from '../models';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	private user: BehaviorSubject<User>;
	private company: BehaviorSubject<Company>;

	public company$: Observable<Company>;
	public user$: Observable<User>;

	constructor() {
		this.user = new BehaviorSubject<User>({} as User);
		this.user$ = this.user.asObservable();

		this.company = new BehaviorSubject<Company>({} as Company);
		this.company$ = this.company.asObservable();
	}

	public setUser(user: User): void {
		this.user.next(user);
		localStorage.setItem('user', JSON.stringify(user));
	}

	public getUser(): User {
		const user = localStorage.getItem('user');
		return JSON.parse(user ? user : '') as User;
	}

	public setCompany(company: Company): void {
		this.company.next(company);
		localStorage.setItem('company', JSON.stringify(company));
	}

	public getCompany(): Company {
		const company = localStorage.getItem('company');
		return company ? JSON.parse(company) : createEmptyCompany();
	}
}
