import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import * as configurationComponents from './components';
import * as configurationContainers from './containers';
import * as configurationServices from './services';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, RouterModule, AppCommonModule],
	providers: [configurationServices.services],
	declarations: [configurationContainers.containers, configurationComponents.components],
	exports: [configurationContainers.containers]
})
export class ConfigurationModule {}
