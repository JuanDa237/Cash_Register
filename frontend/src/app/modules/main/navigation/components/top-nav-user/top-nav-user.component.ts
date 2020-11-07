import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services';
import { User } from '../../models';

@Component({
	selector: 'app-top-nav-user',
	templateUrl: './top-nav-user.component.html',
	styleUrls: ['top-nav-user.component.scss']
})
export class TopNavUserComponent implements OnInit {
	public user: User;

	constructor(private userService: UserService) {
		this.user = {
			name: '',
			role: ''
		};
	}

	ngOnInit(): void {
		this.getUser();
	}

	public getUser(): void {
		this.user = this.userService.getUser();
	}

	public logOut(): void {}
}
