import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../../services';
import { User } from '../../models';
import { AuthService } from '@app/modules/main/landing/services';

@Component({
	selector: 'app-top-nav-user',
	templateUrl: './top-nav-user.component.html',
	styleUrls: ['top-nav-user.component.scss']
})
export class TopNavUserComponent implements OnInit {
	public user: User;

	constructor(private userData: UserDataService, private authService: AuthService) {
		this.user = {
			name: '',
			role: ''
		};
	}

	ngOnInit(): void {
		this.getUser();
	}

	public getUser(): void {
		this.user = this.userData.getUser();
		this.userData.user$.subscribe((x) => (this.user = x));
	}

	public logOut(): void {
		this.authService.logOut(true);
	}
}
