import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild } from '@angular/router';
import { Role } from '../../navigation/models';

import { UserService } from '../../navigation/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {
	constructor(private userService: UserService, private router: Router) {}

	canActivateChild(route: ActivatedRouteSnapshot): boolean {
		const user = this.userService.getUser();
		const routeRoles: Role[] = route.data.roles;

		var canContinue: boolean = false;

		routeRoles.forEach((role) => {
			if (!canContinue) canContinue = user.role == role;
		});

		if (!canContinue) this.router.navigate(['/error/401']);

		return canContinue;
	}
}
