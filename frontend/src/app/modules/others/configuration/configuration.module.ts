import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as configurationContainers from './containers';
import * as configurationServices from './services';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, AppCommonModule],
	providers: [configurationServices.services],
	declarations: [configurationContainers.containers],
	exports: [configurationContainers.containers]
})
export class ConfigurationModule {}
