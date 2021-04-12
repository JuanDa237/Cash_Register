import { Component, OnInit, ViewChild } from '@angular/core';

// Models
import { Client } from '../../../clients/models';
import { Bill } from '../../models';

// Services
import { ClientsService } from '../../../clients/services';
import { BillsService } from '../../services';

// Components
import { TableComponent } from '@app/modules/others/app-common/components';
import { BillViewComponent } from '../../components';

@Component({
	selector: 'app-bills',
	templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit {
	public clients: Client[];
	public bills: Bill[];

	public selectedBill: Bill;
	public selectedClient: Client;

	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	@ViewChild(BillViewComponent)
	private billChild!: BillViewComponent;

	constructor(private clientsService: ClientsService, private billsService: BillsService) {
		this.clients = new Array<Client>(0);
		this.bills = new Array<Bill>(0);

		this.selectedBill = {} as Bill;
		this.selectedClient = {} as Client;

		this.loading = true;
	}

	ngOnInit(): void {
		this.getClients();
	}

	private getClients() {
		this.clientsService.getAllClients().subscribe(
			(response) => {
				this.clients = response;
				this.loading = false;

				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	// Methods for html
	public search(dates: Date[]): void {
		this.loading = true;

		this.billsService.getBillsInInterval(dates[0].toString(), dates[1].toString()).subscribe(
			(response) => {
				this.bills = response;
				this.loading = false;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public viewBill(index: number) {
		this.bills.forEach((bill) => {
			this.clients.forEach((client) => {
				if (bill.idClient == client.id) this.selectedClient = client;
			});
		});

		this.selectedBill = this.bills[index];
		this.billChild.viewBill2(this.selectedBill, this.selectedClient);
	}
}
