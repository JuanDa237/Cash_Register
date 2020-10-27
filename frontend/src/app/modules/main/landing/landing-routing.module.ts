import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Models
import { RouteData } from '@modules/main/navigation/models';

//Containers
import * as landingContainers from './containers/index';

//Module
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
					title: 'Home'
				} as RouteData
			},
			{
				path: 'signIn',
				component: landingContainers.SignInComponent,
				data: {
					title: 'Sign In'
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
