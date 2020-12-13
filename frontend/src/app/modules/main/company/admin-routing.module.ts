import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Module
import { CompanyModule } from './company.module';

// Models
import { RouteData, Role } from '@modules/main/navigation/models/index';

// Containers
import * as companyContainers from './containers/index';
import * as othersContainers from '@modules/others/containers';

// Guards
import * as companyGuards from './guards/index';

const routes: Routes = [
	{
		path: '',
		component: companyContainers.CompanyComponent,
		canActivate: [companyGuards.AuthGuard],
		canActivateChild: [companyGuards.RoleGuard],
		children: [
			{
				path: '',
				redirectTo: 'companies',
				pathMatch: 'full'
			},
			{
				path: 'companies',
				component: othersContainers.CompaniesComponent,
				data: {
					title: 'Compañias',
					hideBreadcrumbs: true,
					roles: [Role.SUPERADMIN]
				} as RouteData
			}
		]
	}
];

@NgModule({
	imports: [CompanyModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
