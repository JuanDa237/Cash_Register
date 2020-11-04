import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

// Models
import { Client, createEmptyClient } from '../../models/index';

// Services
import { ClientsService } from '../../services/index';

// Componets
import { ClientsChartComponent, ClientsFormComponent } from '../../components/index';
import { TableComponent } from '@modules/others/app-common/components';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
	public clients: Array<Client>;
	public creating: boolean;

	public invalidForm: boolean;
	public loading: boolean;

	@ViewChild(ClientsChartComponent)
	private chartChild!: ClientsChartComponent;

	@ViewChild(ClientsFormComponent)
	public formChild!: ClientsFormComponent;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	constructor(private clientsService: ClientsService) {
		this.clients = new Array<Client>(0);
		this.creating = false;
		this.invalidForm = false;
		this.loading = true;
	}

	ngOnInit(): void {
		this.getClients();
	}

	private getClients() {
		this.clientsService.getClients().subscribe(
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
	public changeModal(client: Client | null): void {
		if ((this.creating = client == null)) this.formChild.setClientValues(createEmptyClient());
		else this.formChild.setClientValues(client);
	}

	public createOrUpdateClient(): void {
		this.creating ? this.createClient() : this.updateClient();
	}

	private createClient(): void {
		var client: Client = this.formChild.getClientValues();

		if (this.validateClient(client)) {
			client.creationDate = this.actualDate();

			this.clientsService.saveClient(client).subscribe(
				(response) => {
					this.clients.push(client);
					this.chartChild.newChart();
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private updateClient(): void {
		var client: Client = this.formChild.getClientValues();

		if (this.validateClient(client)) {
			client.creationDate = this.actualDate();

			this.clientsService.updateClient(client).subscribe(
				(response) => {
					const index: number = this.clients
						.map((x) => {
							return x.id;
						})
						.indexOf(client.id);
					this.clients[index] = client;
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	public deleteClient(client: Client): void {
		if (this.validateClient(client)) {
			this.clientsService.deleteClient(client.id).subscribe(
				(response) => {
					const index: number = this.clients
						.map((x) => {
							return x.id;
						})
						.indexOf(client.id);
					this.clients.splice(index, 1);
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private validateClient(client: Client): boolean {
		return client != null && client.name.trim() != '';
	}

	private actualDate(): string {
		var today: string | null = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');
		return today != null ? today : '';
	}
}
