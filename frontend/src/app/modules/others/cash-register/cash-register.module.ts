import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as cashRegisterComponents from './components';
import * as cashRegisterContainers from './containers';

// Modules
import { AppCommonModule } from '@modules/others/app-common/app-common.module';
import { BillsModule } from '@modules/others/bills/bills.module';
import { ClientsModule } from '@modules/others/clients/clients.module';

@NgModule({
	imports: [CommonModule, RouterModule, FormsModule, AppCommonModule, BillsModule, ClientsModule],
	declarations: [cashRegisterComponents.components, cashRegisterContainers.containers],
	exports: [cashRegisterComponents.components, cashRegisterContainers.containers]
})
export class CashRegisterModule {}
