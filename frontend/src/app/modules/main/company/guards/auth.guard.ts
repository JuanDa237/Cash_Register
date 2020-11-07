import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@modules/main/landing/services/index';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		var canContinue: boolean = this.authService.loggedIn();

		if (!canContinue) this.router.navigate(['/error/401']);

		return canContinue;
	}
}
