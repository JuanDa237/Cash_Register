import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as companiesContainers from './containers';

@NgModule({
	imports: [CommonModule],
	declarations: [companiesContainers.containers]
})
export class CompaniesModule {}
