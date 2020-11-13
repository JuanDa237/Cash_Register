import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as configurationContainers from './containers';
import * as configurationServices from './services';

@NgModule({
	imports: [CommonModule],
	providers: [configurationServices.services],
	declarations: [configurationContainers.containers],
	exports: [configurationContainers.containers]
})
export class ConfigurationModule {}
