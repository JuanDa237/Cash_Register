import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

// Models
import { Client, createEmptyClient } from '../../../clients/models/index';
import { Ticket } from '../../models/index';

// Services
import { ClientsService } from '../../../clients/services/index';
import { TicketsService } from '../../services/index';
import { TableComponent } from '@app/modules/others/app-common/components';
import { TicketViewComponent } from '../../components';

@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {
	public clients: Array<Client>;
	public tickets: Array<Ticket>;
	public since: Date;
	public until: Date;

	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	@ViewChild(TicketViewComponent)
	private ticketChild!: TicketViewComponent;

	constructor(private clientsService: ClientsService, private ticketsService: TicketsService) {
		this.clients = new Array<Client>(0);
		this.tickets = new Array<Ticket>(0);
		this.since = new Date();
		this.until = new Date();

		this.loading = true;
	}

	ngOnInit(): void {
		this.getTodaysTickets();
	}

	private getTodaysTickets() {
		var actualDate: string = this.actualDate();
		this.ticketsService.getTicketsInInterval(actualDate, actualDate).subscribe(
			(res) => {
				this.tickets = res;

				this.getClients();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private actualDate(): string {
		var today: string | null = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');
		return today != null ? today : '';
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

		this.ticketsService
			.getTicketsInInterval(dates[0].toString(), dates[1].toString())
			.subscribe(
				(response) => {
					this.tickets = response;
					this.loading = false;
				},
				(error) => {
					throw new Error(error);
				}
			);
	}

	public viewTicket(index: number) {
		var finalClient: Client = createEmptyClient();

		this.tickets.forEach((ticket) => {
			this.clients.forEach((client) => {
				if (ticket.idClient == client.id) finalClient = client;
			});
		});

		this.ticketChild.viewTicket2(this.tickets[index], finalClient);
	}
}
