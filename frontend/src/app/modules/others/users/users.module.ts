import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as usersContainers from './containers';
import * as usersComponents from './components';
import * as usersServices from './services';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, AppCommonModule],
	providers: [usersServices.services],
	declarations: [usersComponents.components, usersContainers.containers],
	exports: [usersComponents.components, usersContainers.containers]
})
export class UsersModule {}
