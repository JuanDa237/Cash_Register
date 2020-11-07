import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Role } from '../../navigation/models';

import { UserService } from '../../navigation/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		const user = this.userService.getUser();
		const routeRoles: Role[] = route.data.roles;

		var canContinue: boolean = false;

		routeRoles.forEach((role) => {
			canContinue = user.role == role;
		});

		if (!canContinue) this.router.navigate(['/error/401']);

		return canContinue;
	}
}
