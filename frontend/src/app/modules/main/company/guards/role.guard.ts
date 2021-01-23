import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild } from '@angular/router';
import { Role } from '../../navigation/models';

import { UserDataService } from '../../navigation/services';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {
	constructor(private userData: UserDataService, private router: Router) {}

	canActivateChild(route: ActivatedRouteSnapshot): boolean {
		const user = this.userData.getUser();
		const routeRoles: Role[] = route.data.roles;

		var canContinue: boolean = false;

		routeRoles.forEach((role) => {
			if (!canContinue) canContinue = user.role == role;
		});

		if (!canContinue) this.router.navigate(['/error/401']);

		return canContinue;
	}
}
