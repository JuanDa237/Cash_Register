import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as navigationComponents from './components';
import * as navigationContainers from './containers';
import * as appCommonLayouts from './layouts';
import * as navigationServices from './services';

@NgModule({
	imports: [CommonModule, RouterModule],
	providers: [navigationServices.services],
	declarations: [
		navigationContainers.containers,
		navigationComponents.components,
		appCommonLayouts.layouts
	],
	exports: [
		navigationContainers.containers,
		navigationComponents.components,
		appCommonLayouts.layouts
	]
})
export class NavigationModule {}
