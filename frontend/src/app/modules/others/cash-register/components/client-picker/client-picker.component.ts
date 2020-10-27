import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ClientsService } from '@modules/others/clients/services';
import { Client } from '@modules/others/clients/models';
import { TableComponent } from '@app/modules/others/app-common/components';

@Component({
	selector: 'app-client-picker',
	templateUrl: './client-picker.component.html'
})
export class ClientPickerComponent implements OnInit {
	public clients: Array<Client>;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	@Output()
	public choseClient: EventEmitter<Client>;

	public chosedClientIndex: number;

	constructor(private clientsService: ClientsService) {
		this.clients = new Array<Client>(0);
		this.chosedClientIndex = -1;

		this.choseClient = new EventEmitter<Client>();
	}

	ngOnInit(): void {
		this.getClients();
	}

	private getClients() {
		this.clientsService.getClients().subscribe(
			(response) => {
				this.clients = response;
				this.table.renderTable();
			},
			(error) => console.log(<any>error)
		);
	}

	//Html methods
	public choseClientEvent(index: number): void {
		this.chosedClientIndex = index;
		this.choseClient.emit(this.clients[index]);
	}

	public refreshPage(): void {
		this.chosedClientIndex = -1;
	}
}
