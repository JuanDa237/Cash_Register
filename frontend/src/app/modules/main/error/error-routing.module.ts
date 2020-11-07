import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Models
import { RouteData } from '@modules/main/navigation/models';

// Module
import { ErrorModule } from './error.module';

// Containers
import * as errorContainers from './containers';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '404'
	},
	{
		path: '401',
		component: errorContainers.Error401Component,
		data: {
			title: '401 - Unathorized'
		} as RouteData
	},
	{
		path: '404',
		component: errorContainers.Error404Component,
		data: {
			title: '404 - Not Found'
		} as RouteData
	},
	{
		path: '500',
		component: errorContainers.Error500Component,
		data: {
			title: '500 - Server error'
		} as RouteData
	},
	{
		path: '**',
		pathMatch: 'full',
		component: errorContainers.Error404Component,
		data: {
			title: '404 - Not Found'
		} as RouteData
	}
];

@NgModule({
	imports: [ErrorModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ErrorRoutingModule {}
