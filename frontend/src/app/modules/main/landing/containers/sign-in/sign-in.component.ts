import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services';

// Models
import { LogInUser } from '../../models';
import { UserDataService } from '@app/modules/main/navigation/services';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
	public user: LogInUser;
	public error: Array<boolean>;
	public rememberedUser: boolean;

	constructor(
		private authService: AuthService,
		private userData: UserDataService,
		private router: Router
	) {
		this.user = {
			username: '',
			password: ''
		};
		this.error = new Array<boolean>(2);
		this.rememberedUser = false;
	}

	ngOnInit(): void {
		this.authService.logOut(false);

		// Get the old user
		var oldUser = this.authService.getRememberedUser();
		if (oldUser) {
			this.user = oldUser;
			this.rememberedUser = true;
		}
	}

	public signIn(): void {
		this.authService.signIn(this.user).subscribe(
			(resolve) => {
				this.authService.setToken(resolve.headers.get('token'));
				this.userData.setUser(resolve.body);

				if (this.rememberedUser) {
					this.authService.setRememberedUser(this.user);
				} else {
					this.authService.deleteRememberedUser();
				}

				this.router.navigate(['/company']);
			},
			(error) => {
				if (error.status == 404) {
					this.error[0] = true;
					this.error[1] = false;
				} else if (error.status == 401) {
					this.error[0] = false;
					this.error[1] = true;
				}
			}
		);
	}

	public enterEvent(event: any): void {
		this.signIn();
	}
}
