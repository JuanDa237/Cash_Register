import { Component, OnInit } from '@angular/core';

//Models
import { Client } from "../../../clients/models/client";
import { Ticket } from "../../../tickets/models/ticket";
import { ProductInTicket } from "../../../product/models/productInTicket";

//Services
import { ClientsService } from "../../../clients/services/clients/clients.service";
import { TicketsService } from "../../../tickets/services/tickets/tickets.service";

//Imports
import { datatableLanguage } from "../../../../models/datatables"; //Datatable
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
      creationDate: "",
      total: 0,
      homeDelivery: false,
      priceOfHomeDelivery: 0
    };
  }

  ngOnInit(): void {
    
    this.getTodaysTickets();
    this.chart();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
  }

  private getTodaysTickets() {
    
    var actualDate: string = this.actualDate();
    this.ticketsService.getTicketsInInterval(actualDate, actualDate).subscribe(
      res => {
        this.tickets = res;
        this.getClients();
      },
      err => console.log(<any>err)
    );
  }

  private actualDate(): string {
    
    var date: Date = new Date();
    var year: string, month: string, day: string;

    year = String(date.getFullYear());
    month = String(date.getMonth() + 1);
    day = String(date.getDate());
    
    if (month.length == 1) {
      month = "0" + month;
    }
    
    if (day.length == 1) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
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
        var homeDeliverysInMonths: Array<number> = new Array<number>(12);

        for(var i = 0; i < 12; i++) {
          totalInMonths[i] = 0;
          homeDeliverysInMonths[i] = 0;
        }

        for(var i = 0; i < dates.length; i++) {

          totalInMonths[Number(dates[i].creationDate)] += dates[i].total;

          if(dates[i].homeDelivery) {
            homeDeliverysInMonths[Number(dates[i].creationDate)]++;
          }
        }

        var myChart = new Chart("myChart", {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: 
                [
                  {
                    label: 'Total De Cada Mes',
                    data: totalInMonths,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 155, 1)',
                    borderWidth: 2
                  },
                  {
                    label: 'Total de domicilios',
                    data: homeDeliverysInMonths,
                    backgroundColor: 'rgba(12, 092, 323, 0.5)',
                    borderColor: 'rgba(12, 092, 323, 1)',
                    borderWidth: 2,
                    hidden: true
                  }
                ]
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
      creationDate: ticket.creationDate,
      total: ticket.total,
      homeDelivery: ticket.homeDelivery,
      priceOfHomeDelivery: ticket.priceOfHomeDelivery
    }
  }
}
