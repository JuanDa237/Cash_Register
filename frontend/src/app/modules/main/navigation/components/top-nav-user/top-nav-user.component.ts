import { Component, OnInit } from '@angular/core';
import { User } from '@app/modules/main/landing/models';
import { UserService } from '../../services';

@Component({
	selector: 'app-top-nav-user',
	templateUrl: './top-nav-user.component.html',
	styleUrls: ['top-nav-user.component.scss']
})
export class TopNavUserComponent implements OnInit {
	public user: {};

	constructor(private userService: UserService) {
		this.user = {
			name: ''
		};
	}

	ngOnInit(): void {
		this.getUser();
	}

	public getUser(): void {
		this.userService.getUser().subscribe(
			(response) => {
				this.user = response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public logOut(): void {}
}
