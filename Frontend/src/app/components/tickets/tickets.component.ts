import { Component, OnInit } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Product } from "../../models/product";
import { Client } from "../../models/client";
import { Ticket } from "../../models/ticket";
import { ProductInTicket } from "../../models/productInTicket";

//Datatable
import { datatableLanguage } from "../../models/datatables/datatables";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  public products: Array<Product>;
  public clients: Array<Client>;
  public tickets: Array<Ticket>;
  public productsInTickets: Array<ProductInTicket>;
  public selectedTicketId: number;
  public selectedTicketTotal: number;
  public dtOptions: DataTables.Settings;

  constructor(
    private productsService: ProductsService
  ) {
    this.tickets = null;        
  }

  ngOnInit(): void {
    
    this.getTickets();
    this.getClients();
    this.getProductInTicket();
    this.getProducts();

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
    this.productsService.getAllClients().subscribe(
      response => {
        if(response.length >= 0) {

          this.clients = response;
        }
      },
      error => console.log(<any>error)
    );
  }  

  private getProductInTicket() {
    this.productsService.getProductsInTickets().subscribe(
      response => {
        if(response.length >= 0) {

          this.productsInTickets = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  private getProducts() {
    this.productsService.getAllProducts().subscribe(
      response => {
        if(response.length >= 0) {

          this.products = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  //Methods for html
  
  public viewTicket(id: number, total: number) {
    this.selectedTicketId = id;
    this.selectedTicketTotal = total;
  }
}
