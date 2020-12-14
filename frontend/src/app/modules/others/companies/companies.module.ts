import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import * as companiesComponents from './components';
import * as companiesContainers from './containers';
import * as companiesServices from './services';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';
import { CompaniesFormComponent } from './containers/companies-form/companies-form.component';

@NgModule({
	imports: [CommonModule, RouterModule, ReactiveFormsModule, AppCommonModule],
	declarations: [companiesContainers.containers, companiesComponents.components, CompaniesFormComponent],
	providers: [companiesServices.services],
	exports: [companiesContainers.containers, companiesComponents.components]
})
export class CompaniesModule {}
