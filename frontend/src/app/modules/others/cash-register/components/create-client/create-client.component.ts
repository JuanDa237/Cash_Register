import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Sweet } from '@app/modules/others/app-common/libs';
import { ClientsFormComponent } from '@app/modules/others/clients/components';

// Models
import { Client, createEmptyClient } from '@app/modules/others/clients/models';
import { ClientsService } from '@app/modules/others/clients/services';

@Component({
	selector: 'app-create-client',
	templateUrl: './create-client.component.html'
})
export class CreateClientComponent {
	public invalidForm: boolean;
	private sweet: Sweet;

	@Output()
	public newClient: EventEmitter<Client>;

	@ViewChild(ClientsFormComponent)
	public formChild!: ClientsFormComponent;

	constructor(private clientsService: ClientsService) {
		this.invalidForm = true;
		this.sweet = new Sweet();
		this.newClient = new EventEmitter<Client>();
	}

	public closeModal(): void {
		this.formChild.setClientValues(createEmptyClient());
	}

	public async createClient(): Promise<void> {
		var client: Client = this.formChild.getClientValues();

		if (await this.sweet.create('¿Estas seguro de crear el cliente?')) {
			this.clientsService.saveClient(client).subscribe(
				(response) => {
					client.id = response.id;

					this.newClient.emit(client);
					this.sweet.created('Se creo el cliente satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
		this.formChild.setClientValues(createEmptyClient());
	}
}
