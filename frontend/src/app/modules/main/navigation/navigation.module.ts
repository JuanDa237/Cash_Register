import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as navigationComponents from './components';
import * as navigationContainers from './containers';
import * as appCommonLayouts from './layouts';
import * as navigationServices from './services';

// Modules
import * as landingServices from '../landing/services';
import { AppCommonModule } from '@modules/others/app-common/app-common.module';

@NgModule({
	imports: [CommonModule, RouterModule, AppCommonModule],
	providers: [navigationServices.services, landingServices.services],
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
