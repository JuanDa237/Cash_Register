import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

// Models
import { Client, createEmptyClient } from '../../models/index';

// Services
import { ClientsService } from '../../services/index';

// Componets
import { ClientsChartComponent, ClientsFormComponent } from '../../components/index';
import { TableComponent } from '@modules/others/app-common/components';

// Libs
import { Sweet } from '@app/modules/others/app-common/libs';

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

	private sweet: Sweet;

	constructor(private clientsService: ClientsService) {
		this.clients = new Array<Client>(0);
		this.creating = false;
		this.invalidForm = false;
		this.loading = true;
		this.sweet = new Sweet();
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
			this.clientsService.saveClient(client).subscribe(
				(response) => {
					client.id = response.id;
					this.clients.push(client);

					// Events
					this.table.rerenderTable();
					this.chartChild.newChart();
					this.sweet.created('Se creo el cliente satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	private updateClient(): void {
		var client: Client = this.formChild.getClientValues();

		if (this.validateClient(client)) {
			this.clientsService.updateClient(client).subscribe(
				(response) => {
					const index: number = this.clients
						.map((x) => {
							return x.id;
						})
						.indexOf(client.id);
					this.clients[index] = client;

					// Events
					this.table.rerenderTable();
					this.sweet.created('Se edito el cliente satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	public async deleteClient(client: Client): Promise<void> {
		if (
			this.validateClient(client) &&
			(await this.sweet.delete('¿Estas seguro de eliminar el cliente?'))
		) {
			this.clientsService.deleteClient(client.id).subscribe(
				(response) => {
					const index: number = this.clients
						.map((x) => {
							return x.id;
						})
						.indexOf(client.id);
					this.clients.splice(index, 1);

					// Events
					this.table.rerenderTable();
					this.sweet.deleted('Se elimino el cliente satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	private validateClient(client: Client): boolean {
		return client != null && client.name.trim() != '';
	}
}
