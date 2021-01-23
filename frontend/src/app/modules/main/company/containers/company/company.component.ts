import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '@app/modules/main/navigation/services';

import { UserService } from '@modules/others/configuration/services';

@Component({
	selector: 'app-company',
	templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
	constructor(
		private userService: UserService,
		private userData: UserDataService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getUserCompany();
	}

	private getUserCompany(): void {
		this.userService.getUserCompany().subscribe(
			(resolve) => {
				this.userData.setUser(resolve.user);
				this.userData.setCompany(resolve.company);
			},
			(error) => {
				this.router.navigate(['/error/401']);
				throw new Error(error);
			}
		);
	}
}
