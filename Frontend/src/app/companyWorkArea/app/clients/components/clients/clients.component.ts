import { Component, OnInit } from '@angular/core';

//Models
import { Client } from "../../models/client";

//Services
import { ClientsService } from "../../services/clients/clients.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../../../models/datatables"; //Datatable
import { Chart } from "chart.js"; //Datatable

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  
  public clients: Array<Client>;
  public client: Client;
  public create: boolean;
  public dtOptions: DataTables.Settings;

  constructor(
    private clientsService: ClientsService
  ) {
    this.clients = null;
    this.client = {
      id: 0,
      name: "",
      address: "",
      phoneNumber: "",
      creationDate: ""
    };    
  }

  ngOnInit(): void {
    
    this.getClients();
    this.chart();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
  }

  private getClients() {
    this.clientsService.getClients().subscribe(
      response => {
        if(response.length >= 0) {

          this.clients = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  //Methods for html
  public changeModal(client?: Client): void {
    
    if(client != null && this.validateClient(client)) {

      this.create = false;
      this.client = {
        id: client.id,
        name: client.name,
        address: client.address,
        phoneNumber: client.phoneNumber,
        creationDate: client.creationDate
      };
    }
    else {
      
      this.create = true;
      this.client = {
        id: 0,
        name: "",
        address: "",
        phoneNumber: "",
        creationDate: ""
      };
    }
  }

  public createClient(): void {

    if(this.validateClient(this.client)) {

      this.client.creationDate = this.actualDate();
      this.clientsService.saveClient(this.client).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se creo satisfactoriamente el cliente.',
            showConfirmButton: false,
            timer: 1500
          });
          this.getClients();
        },
        err => console.log(<any>err)
        
      );
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public updateClient(): void {

    if(this.validateClient(this.client)) {
      
      this.client.creationDate = this.actualDate();
      this.clientsService.updateClient(this.client).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se actualizo satisfactoriamente el cliente.',
            showConfirmButton: false,
            timer: 1500
          });
          this.getClients();
        },
        err => console.log(<any>err)
      );
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public deleteClient(client: Client): void {
    
    if(this.validateClient(client)) {
      
      this.create = false;
      this.client = {
        id: client.id,
        name: client.name,
        address: client.address,
        phoneNumber: client.phoneNumber,
        creationDate: client.creationDate
      };
      
      Swal.fire({
        title: '¿Estas seguro de eliminar el cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.value) {

          this.clientsService.deleteClient(this.client.id).subscribe(
            res => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se elimino satisfactoriamente el cliente.',
                showConfirmButton: false,
                timer: 1500
              });              
              this.getClients();
            },
            err => console.log(<any>err)
          ); 
        }
      });
    }
  }

  public chart(): void {

    this.clientsService.getNewClientsInYear().subscribe(
      res => {

        var clientsInYear: Array<any> = res;
        var totalNewClients: Array<number> = new Array<number>(12);
        var totalExClients: Array<number> = new Array<number>(12);

        for(var i = 0; i < 12; i++) {
          totalNewClients[i] = 0;
          totalExClients[i] = 0;
        }

        for(var i = 0; i < clientsInYear.length; i++) {

          if(clientsInYear[i].active == 0) {
            totalExClients[Number(clientsInYear[i].creationDate)]++;
          }
          else if(clientsInYear[i].active == 1) {
            totalNewClients[Number(clientsInYear[i].creationDate)]++;
          }
        }

        var myChart = new Chart("myChart", {
                type: 'line',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [
                      {
                        label: 'Clientes Nuevos',
                        data: totalNewClients,
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 155, 1)',
                        borderWidth: 2
                    },
                    {
                      label: 'Clientes Eliminados',
                      data: totalExClients,
                      backgroundColor: 'rgba(217, 83, 79, 0.5)',
                      borderColor: 'rgba(217, 83, 79, 1)',
                      borderWidth: 2
                  },
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

  public enterEvent(event: any): void {
    if(this.create) {
      this.createClient();      
    }
    else {
      this.updateClient();
    }    
  }

  private validateClient(client: Client): boolean {
    
    if(client.name.trim() != "")
      return true;
    
    return false;
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
}
