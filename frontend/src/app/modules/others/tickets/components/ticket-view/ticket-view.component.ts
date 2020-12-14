import { Component, OnInit } from '@angular/core';

import { ClientsService } from '@app/modules/others/clients/services';
import { Client, createEmptyClient } from '@app/modules/others/clients/models';

import { CompanyService } from '@app/modules/others/companies/services';
import { Company, createEmptyCompany } from '@app/modules/others/companies/models';

import { TicketsService } from '../../services';
import { Ticket, createEmptyTicket } from '../../models';

import { ProductInTicket } from '@app/modules/others/products/models';

//Api
import { environment } from '@enviroment/environment';

@Component({
	selector: 'app-ticket-view',
	templateUrl: './ticket-view.component.html'
})
export class TicketViewComponent implements OnInit {
	public company: Company;
	public client: Client;
	public ticket: Ticket;

	public productsInTicket: Array<ProductInTicket>;

	public apiUrl: string;
	public loadingCompany: boolean;

	constructor(
		private ticketsService: TicketsService,
		private clientsService: ClientsService,
		private companyService: CompanyService
	) {
		this.productsInTicket = new Array<ProductInTicket>(0);
		this.ticket = createEmptyTicket();
		this.client = createEmptyClient();
		this.company = createEmptyCompany();

		this.apiUrl = environment.apiUrl;
		this.loadingCompany = true;
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany() {
		this.companyService.getCompany().subscribe(
			(response) => {
				this.company = response;
				this.loadingCompany = false;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	// Parents methods
	public viewTicket(id: number): void {
		this.ticketsService.getTicket(id).subscribe(
			(response) => {
				this.ticket = response;

				this.ticketsService.getProductsInTicket(this.ticket.id).subscribe(
					(response) => {
						this.productsInTicket = response;
					},
					(error) => {
						throw new Error(error);
					}
				);

				this.clientsService.getClient(this.ticket.idClient).subscribe(
					(response) => {
						this.client = response;
					},
					(error) => {
						throw new Error(error);
					}
				);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public viewTicket2(ticket: Ticket, client: Client): void {
		this.ticket = ticket;
		this.client = client;

		this.ticketsService.getProductsInTicket(this.ticket.id).subscribe(
			(response) => {
				this.productsInTicket = response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public viewTicket3(ticket: Ticket, client: Client, products: ProductInTicket[]): void {
		this.ticket = ticket;
		this.client = client;
		this.productsInTicket = products;
	}
}
