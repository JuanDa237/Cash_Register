import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as clientsServices from './services';
import * as clientsComponents from './components/index';
import * as clientsContainers from './containers/index';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, AppCommonModule],
	providers: [clientsServices.services],
	declarations: [clientsComponents.components, clientsContainers.containers],
	exports: [clientsComponents.components, clientsContainers.containers]
})
export class ClientsModule {}
