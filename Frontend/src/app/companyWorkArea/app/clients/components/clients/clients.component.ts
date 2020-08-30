import { Component, OnInit } from '@angular/core';

//Models
import { Client } from "../../models/client";

//Services
import { ClientsService } from "../../services/clients/clients.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../../../models/datatables"; //Datatable

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
      phoneNumber: ""
    };    
  }

  ngOnInit(): void {
    
    this.getClients();

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
  public changeModal(id?: number, name?: string, address?: string, phoneNumber?: string): void {
    if(this.validate(id, name, address, phoneNumber)) {
      this.create = false;
      this.client = {
        id: id,
        name: name,
        address: address,
        phoneNumber: phoneNumber
      };
    }
    else {
      this.create = true;
      this.client = {
        id: 0,
        name: "",
        address: "",
        phoneNumber: ""
      };
    }
  }

  public createClient(): void {
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

  public updateClient(): void {
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

  public deleteClient(id?: number, name?: string, address?: string, phoneNumber?: string): void {
    if(id != null && name != null && name != "") {
      this.create = false;
      this.client = {
        id: id,
        name: name,
        address: address,
        phoneNumber: phoneNumber
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

  public enterEvent(event: any): void {
    if(this.create) {
      this.createClient();      
    }
    else {
      this.updateClient();
    }    
  }

  private validate(id?: number, name?: string, address?: string, phoneNumber?: string): boolean {
    if(id != null && name != null && name != "" && address != null && address != "" && phoneNumber != null && phoneNumber != "") 
      return true;
    
    return false;
  }
}
