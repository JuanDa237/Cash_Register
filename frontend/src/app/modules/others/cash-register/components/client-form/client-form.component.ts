import { Component, Input } from '@angular/core';
import { Client, createEmptyClient } from '@app/modules/others/clients/models';

@Component({
	selector: 'app-client-form',
	templateUrl: './client-form.component.html',
	styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
	@Input()
	public client: Client;

	constructor() {
		this.client = createEmptyClient();
	}
}
