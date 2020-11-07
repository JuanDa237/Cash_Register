import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Models
import { RouteData } from '@modules/main/navigation/models';

// Containers
import * as landingContainers from './containers/index';

// Module
import { LandingModule } from './landing.module';

export const routes: Routes = [
	{
		path: '',
		component: landingContainers.LandingComponent,
		children: [
			{
				path: '',
				component: landingContainers.HomeComponent,
				data: {
					title: 'Caja Registradora'
				} as RouteData
			},
			{
				path: 'signIn',
				component: landingContainers.SignInComponent,
				data: {
					title: 'Ingresar'
				} as RouteData
			}
		]
	}
];

@NgModule({
	imports: [LandingModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LandingRoutingModule {}
