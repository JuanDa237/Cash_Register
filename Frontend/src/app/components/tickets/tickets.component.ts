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
import { Chart } from "chart.js"; //Datatable

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  public clients: Array<Client>;
  public tickets: Array<Ticket>;
  public productsInTickets: Array<ProductInTicket>;
  public selectedTicket: Ticket;
  public since: Date;
  public until: Date;
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

    this.chart();
    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
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

  private chart(): void {

    this.ticketsService.getTicketsInYear().subscribe(
      res => {
        
        var dates: Array<any> = res;
        var totalInMonths: Array<number> = new Array<number>(12);

        for(var i = 0; i < totalInMonths.length; i++) {
          totalInMonths[i] = 0;
        }

        for(var i = 0; i < dates.length; i++) {

          totalInMonths[Number(dates[i].date)] += dates[i].total;
        }

        var myChart = new Chart("myChart", {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Total De Cada Mes',
                    data: [
                      totalInMonths[0],
                      totalInMonths[1],
                      totalInMonths[2],
                      totalInMonths[3],
                      totalInMonths[4],
                      totalInMonths[5],
                      totalInMonths[6],
                      totalInMonths[7],
                      totalInMonths[8],
                      totalInMonths[9],
                      totalInMonths[10],
                      totalInMonths[11],
                      totalInMonths[12]                                            
                    ],
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 155, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
      },
      err => console.log(<any>err)
    );   
  }
  //Methods for html
  public search(): void {
    this.ticketsService.getTicketsInInterval(this.since.toString(), this.until.toString()).subscribe(
      response => {
        if(response.length >= 0) {

          this.tickets = response;
          this.getClients();
          this.getProductInTicket();
        }
      },
      err => console.log(<any>err)
    );
  }

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
