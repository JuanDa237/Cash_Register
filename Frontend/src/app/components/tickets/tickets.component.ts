import { Component, OnInit } from '@angular/core';

//Models
import { Client } from "../../models/client";
import { Ticket } from "../../models/ticket";
import { ProductInTicket } from "../../models/productInTicket";

//Services
import { ClientsService } from "../../services/clients/clients.service";
import { TicketsService } from "../../services/tickets/tickets.service";

//Imports
import { datatableLanguage } from "../../models/datatables/datatables"; //Datatable

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  public clients: Array<Client>;
  public tickets: Array<Ticket>;
  public productsInTickets: Array<ProductInTicket>;
  public selectedTicket: Ticket;
  public dtOptions: DataTables.Settings;

  constructor(
    private clientsService: ClientsService,
    private ticketsService: TicketsService    
  ) {
    this.tickets = new Array<Ticket>(0);
    this.selectedTicket = {
      id: 0,
      idClient: 0,
      date: "",
      total: 0,
      homeDelivery: false,
      priceOfHomeDelivery: 0
    };
  }

  ngOnInit(): void {
    
    this.getTickets();
    this.getClients();
    this.getProductInTicket();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
  }

  private getTickets() {
    this.ticketsService.getTickets().subscribe(
      response => {
        if(response.length >= 0) {

          this.tickets = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  private getClients() {
    this.clientsService.getAllClients().subscribe(
      response => {
        if(response.length >= 0) {

          this.clients = response;
        }
      },
      error => console.log(<any>error)
    );
  }  

  private getProductInTicket() {
    this.ticketsService.getProductsInTickets().subscribe(
      response => {
        if(response.length >= 0) {

          this.productsInTickets = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  //Methods for html
  
  public viewTicket(ticket: Ticket) {
    
    this.selectedTicket = {
      id: ticket.id,
      idClient: ticket.idClient,
      date: ticket.date,
      total: ticket.total,
      homeDelivery: ticket.homeDelivery,
      priceOfHomeDelivery: ticket.priceOfHomeDelivery
    }
  }
}
