import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as configurationContainers from './containers';
import * as configurationServices from './services';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';
import { CompaniesModule } from '../companies/companies.module';

@NgModule({
	imports: [CommonModule, RouterModule, AppCommonModule, CompaniesModule],
	providers: [configurationServices.services],
	declarations: [configurationContainers.containers],
	exports: [configurationContainers.containers]
})
export class ConfigurationModule {}
