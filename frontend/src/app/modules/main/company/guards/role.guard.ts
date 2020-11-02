import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Role } from '../../navigation/models';

import { UserService } from '../../navigation/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		const user = await this.userService.getUser().toPromise();

		var userRole: string = user.role;
		var routeRoles: Role[] = route.data.roles;

		var canContinue: boolean = false;

		routeRoles.forEach((role) => {
			if (userRole == role) canContinue = true;
		});

		if (!canContinue) this.router.navigate(['/error/401']);

		return canContinue;
	}
}
