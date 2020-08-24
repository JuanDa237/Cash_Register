import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Product } from "../../models/product";
import { Client } from 'src/app/models/client';
import { Ticket } from 'src/app/models/ticket';
import { ProductInTicket } from 'src/app/models/productInTicket';

//PDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//Datatable
import { datatableLanguage } from "../../models/datatables/datatables";

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
  public domicile: boolean;
  
  //Clients
  public clients: Array<Client>;
  public client: Client;

  //Datatables
  public dtOptions: DataTables.Settings;

  constructor(
    private productsService: ProductsService
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
    this.domicile = false;
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
    this.productsService.getClients().subscribe(
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
  }

  public finishOrder(): void {    

    //Create new ticket
    var newTicket: Ticket = {
      idClient: this.client.id,
      total: this.totalPrice,
      date: this.actualDate()
    }
    
    this.productsService.saveTicket(newTicket).subscribe(
      res => {        
        var id: number = res.id[0].id;

        for(var i = 0; i < this.shoppingCart.length; i++) {

          //Create relations
          var newProductInTicket: ProductInTicket = {
            idTicket: id,
            idProduct: this.shoppingCart[i].product.id,
            amount: this.shoppingCart[i].amount
          }

          this.productsService.createProductInTicket(newProductInTicket).subscribe(
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
    this.domicile = false;

    this.getProducts();
    this.getClients();
  }
}
