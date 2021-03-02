import { Component, Input } from '@angular/core';
import { Client, createEmptyClient } from '@app/modules/others/clients/models';

@Component({
	selector: 'app-view-client',
	templateUrl: './view-client.component.html',
	styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent {
	@Input()
	public client: Client;

	constructor() {
		this.client = createEmptyClient();
	}
}
