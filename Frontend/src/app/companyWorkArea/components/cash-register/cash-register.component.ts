import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

//Models
import { Product } from "../../app/product/models/product";
import { Client } from '../../app/clients/models/client';
import { Ticket } from '../../app/tickets/models/ticket';
import { ProductInTicket } from '../../app/product/models/productInTicket';

//Services
import { ProductsService } from "../../app/product/services/products/products.service";
import { ClientsService } from "../../app/clients/services/clients/clients.service";
import { TicketsService } from "../../app/tickets/services/tickets/tickets.service";

//Imports
import jsPDF from "jspdf"; //PDF
import html2canvas from "html2canvas"; //PDF styles
import { datatableLanguage } from "../../models/datatables"; //Datatable

interface productInCart {
  product: Product;
  amount: number;
}

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {

  //Products
  public products: Array<Product>;
  public shoppingCart: Array<productInCart>;
  public totalPrice: number;

  //Ticket
  @ViewChild("ticket") ticket: ElementRef;
  public homeDelivery: boolean;
  public priceOfHomeDelivery: number;
  
  //Clients
  public clients: Array<Client>;
  public client: Client;

  //Datatables
  public dtOptions: DataTables.Settings;

  constructor(
    private productsService: ProductsService,
    private clientsService: ClientsService,
    private ticketsService: TicketsService
  ) {
    this.products = null;
    this.shoppingCart = new Array<productInCart>(0);
    this.totalPrice = 0;
    this.clients = null;
    this.client = {
      id: 0,
      name: "",
      address: "",
      phoneNumber: ""
    };
    this.homeDelivery = false;
    this.priceOfHomeDelivery = null;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getClients();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage,
      "lengthChange": false,
      "info": false
    }
  }

  private getProducts() {
    this.productsService.getProducts().subscribe(
      response => {
        if(response.length >= 0) {

          this.products = response;
        }
      },
      error => console.log(<any>error)
    );
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

  //Html methods

  public addProduct(product: Product): void {
        
    const newProduct: productInCart = {
      product: {
        id: product.id,
        idCategory: product.idCategory,
        name: product.name,
        price: product.price
      },
      amount: 1
    }

    this.shoppingCart.push(newProduct);
    this.actualizePrice();
  }

  public deleteProduct(index: number): void {
    this.shoppingCart.splice(index, 1);
    this.actualizePrice();
  }

  public choseClient(id: number): void {

    for(var i = 0; i < this.clients.length; i++) {
      if(this.clients[i].id == id) {
        
        var chosedClient: Client = {
          id: id,
          name: this.clients[i].name,
          address: this.clients[i].address,
          phoneNumber: this.clients[i].phoneNumber,
        }

        this.client = chosedClient;
      }
    }    
  }

  private actualizePrice(): void {
    
    this.totalPrice = 0;    

    for(var i = 0; i < this.shoppingCart.length; i++) {

      var amount: number = this.shoppingCart[i].amount;
      this.shoppingCart[i].product.price = 0;

      if(amount <= 0 || amount == null) {

        this.deleteProduct(i);
        break;
      }      

      var id: number = this.shoppingCart[i].product.id;

      var indexProduct = this.products.findIndex(function(product) {

        if(product.id == id)
          return product;
      });

      var priceForOne: number = this.products[indexProduct].price;

      this.totalPrice +=  priceForOne * amount;   
      this.shoppingCart[i].product.price = priceForOne * amount;      
    }
    
    if(this.homeDelivery) {      
      this.totalPrice +=  this.priceOfHomeDelivery;
    }
  }

  public finishOrder(): void {    

    this.actualizePrice();
    
    //Create new ticket
    var newTicket: Ticket = {
      idClient: this.client.id,
      date: this.actualDate(),
      total: this.totalPrice,
      homeDelivery: this.homeDelivery,
      priceOfHomeDelivery: this.priceOfHomeDelivery
    }
    
    this.ticketsService.saveTicket(newTicket).subscribe(
      res => {        
        var id: number = res.id[0].id;

        for(var i = 0; i < this.shoppingCart.length; i++) {

          //Create relations
          var newProductInTicket: ProductInTicket = {
            idTicket: id,
            name: this.shoppingCart[i].product.name,
            price: this.shoppingCart[i].product.price,
            amount: this.shoppingCart[i].amount            
          }

          this.ticketsService.createProductInTicket(newProductInTicket).subscribe(
            res => {},
            err => console.log(<any>err)
          );
        }
      },
      err => console.log(<any>err)
    );

    //Actualize Amount Of Products

    //id products in cart
    var products: Array<number> = new Array<number>(0);

    for(var i = 0; i < this.shoppingCart.length; i++) {
      
      for(var x = 0; x < this.shoppingCart[i].amount; x++) {
        
        products.push(this.shoppingCart[i].product.id);
      }
    }

    this.productsService.updateAmountIngredients(products).subscribe(
      res => {},
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

  public priceOfHomeDeliveryChange(): void {
    if(this.homeDelivery) {
      
      this.priceOfHomeDelivery = 0;
    }
    else {

      this.priceOfHomeDelivery = null;      
    }
  }

  public printPDF(): void {

    html2canvas(this.ticket.nativeElement).then((canvas) => {
      
      var imgData = canvas.toDataURL("image/png"); //IMG BUG
      var doc = new jsPDF("p","mm","a4");
      
      var imgHeigth = canvas.height * 208 / canvas.width;

      doc.addImage(imgData, 0, 0, 208, imgHeigth);

      var date: Date = new Date();
      var nameDocument: string = this.client.name + "_" + date.getDay() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      doc.save(nameDocument + ".pdf");
    });
  }

  public refreshPage(): void {    
    this.products = null;
    this.shoppingCart = new Array<productInCart>(0);
    this.totalPrice = 0;
    this.clients = null;
    this.client = {
      id: 0,
      name: "",
      address: "",
      phoneNumber: ""
    };
    this.homeDelivery = false;
    this.priceOfHomeDelivery = null;

    this.getProducts();
    this.getClients();
  }
}
