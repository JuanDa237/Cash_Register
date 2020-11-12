import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as configurationCompanyContainers from './containers';
import * as configurationCompanyServices from './services';

@NgModule({
	imports: [CommonModule],
	providers: [configurationCompanyServices.services],
	declarations: [configurationCompanyContainers.containers],
	exports: [configurationCompanyContainers.containers]
})
export class ConfigurationCompanyModule {}
