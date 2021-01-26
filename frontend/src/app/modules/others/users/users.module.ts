import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as usersContainers from './containers';
import * as usersComponents from './components';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, AppCommonModule],
	declarations: [usersComponents.components, usersContainers.containers],
	exports: [usersComponents.components, usersContainers.containers]
})
export class UsersModule {}
