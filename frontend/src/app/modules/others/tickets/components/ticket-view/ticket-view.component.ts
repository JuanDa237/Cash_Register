import { Component, OnInit } from '@angular/core';
import { Client, createEmptyClient } from '@app/modules/others/clients/models';
import { ClientsService } from '@app/modules/others/clients/services';
import { ProductInTicket } from '@app/modules/others/products/models';
import { Ticket, createEmptyTicket } from '../../models';
import { TicketsService } from '../../services';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html'
})
export class TicketViewComponent implements OnInit{

  //public company: Company;

  public client: Client;
  public ticket: Ticket;

  public productsInTicket: Array<ProductInTicket>;

  constructor(
    private ticketsService: TicketsService,
    private clientsService: ClientsService
  ) {
    this.productsInTicket = new Array<ProductInTicket>(0);
    this.ticket = createEmptyTicket();
    this.client = createEmptyClient();
  }

  ngOnInit(): void {
    //this.getCompany();
  }

  /*
  private getCompany() {

    this.companiesService.getCompany().subscribe(
      response => {
        this.company = response;
      },
      error => {throw new Error(error);
      }
    );
  }
  */

  //Parents methods
  public createTicket(id: number): void {

    this.ticketsService.getTicket(id).subscribe(
      response => {
          this.ticket = response;

          this.ticketsService.getProductsInTicket(this.ticket.id).subscribe(
            response => {
                this.productsInTicket = response;
              },
              error => {throw new Error(error)}
            );
        
            this.clientsService.getClient(this.ticket.idClient).subscribe(
              response => {
                  this.client = response;
                },
                error => {throw new Error(error)}
              );
        },
        error => {throw new Error(error)}
      );
  }

  public createTicket2(ticket: Ticket, productsInTicket: Array<ProductInTicket>, client: Client): void {
    this.ticket = ticket;
    this.productsInTicket = productsInTicket;
    this.client = client;
  }

  public createTicket3(ticket: Ticket, client: Client): void {
    this.ticket = ticket;
    this.client = client;

    this.ticketsService.getProductsInTicket(this.ticket.id).subscribe(
      response => {
          this.productsInTicket = response;
        },
        error => {throw new Error(error)}
      );
  }
}