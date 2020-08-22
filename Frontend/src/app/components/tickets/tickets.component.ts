import { Component, OnInit } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Ticket } from "../../models/ticket";
import { Client } from "../../models/client";

//Datatable
import { datatableLanguage } from "../../models/datatables/datatables";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  public tickets: Array<Ticket>;
  public clients: Array<Client>;
  public dtOptions: DataTables.Settings;

  constructor(
    private productsService: ProductsService
  ) {
    this.tickets = null;        
  }

  ngOnInit(): void {
    
    this.getTickets();
    this.getClients();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
  }

  private getTickets() {
    this.productsService.getTickets().subscribe(
      response => {
        if(response.length >= 0) {

          this.tickets = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  private getClients() {
    this.productsService.getClients().subscribe(
      response => {
        if(response.length >= 0) {

          this.clients = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  //Methods for html
  
  public viewTicket() {

  }
}
