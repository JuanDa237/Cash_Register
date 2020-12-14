import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as configurationContainers from './containers';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';
import { CompaniesModule } from '../companies/companies.module';

@NgModule({
	imports: [CommonModule, RouterModule, AppCommonModule, CompaniesModule],
	declarations: [configurationContainers.containers],
	exports: [configurationContainers.containers]
})
export class ConfigurationModule {}
