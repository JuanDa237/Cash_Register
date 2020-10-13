import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Client, createEmptyClient } from '@modules/others/clients/models';

import { Product, ProductInTicket } from '@modules/others/products/models';
import { ProductsService } from '@modules/others/products/services';

import { Ticket } from '@modules/others/tickets/models';
import { TicketsService } from '@modules/others/tickets/services';

import { ProductInCart } from '../../models';
import { TicketViewComponent } from '@modules/others/tickets/components';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  
  public shoppingCart: Array<ProductInCart>;
  public totalPrice: number;

  public homeDelivery: boolean;
  public priceOfHomeDelivery: number | null;

  @ViewChild(TicketViewComponent)
  public ticketChild!: TicketViewComponent;

  @Input() 
  public client: Client;

  @Output()
  public refreshPage: EventEmitter<null>;

  constructor(
    private productsService: ProductsService,
    private ticketsService: TicketsService
  ) {
    this.shoppingCart = new Array<ProductInCart>(0);
    this.totalPrice = 0;
    this.homeDelivery = false;
    this.priceOfHomeDelivery = null;
    this.client = createEmptyClient();
    this.refreshPage = new EventEmitter<null>();
  }

  //Parent methods
  public addProduct(product: Product): void {
        
    const newProduct: ProductInCart = {
      product: {
        id: product.id,
        idCategory: product.idCategory,
        name: product.name,
        price: product.price
      },
      amount: 1,
      total: product.price
    }

    this.shoppingCart.push(newProduct);
    this.actualizePrice();
  }

  //Html methods
  public deleteProduct(index: number): void {
    this.shoppingCart.splice(index, 1);
    this.actualizePrice();
  }

  public actualizePrice(): void {
    
    this.totalPrice = 0;    

    for(var i = 0; i < this.shoppingCart.length; i++) {

      var amount: number = this.shoppingCart[i].amount;

      if(amount <= 0 || amount == null) {

        this.shoppingCart.splice(i, 1);
        break;
      }

      var priceForOne: number = this.shoppingCart[i].product.price;

      this.totalPrice +=  priceForOne * amount;
      this.shoppingCart[i].total = priceForOne * amount;      
    }
    
    if(this.priceOfHomeDelivery == null || this.priceOfHomeDelivery == 0) {
      this.priceOfHomeDelivery = null;
      this.homeDelivery = false;
    }
    else if(this.homeDelivery) {
      this.totalPrice +=  this.priceOfHomeDelivery;
    }
  }

  public priceOfHomeDeliveryChange(): void {
    
    this.homeDelivery ? this.priceOfHomeDelivery = 0 : this.priceOfHomeDelivery = null;
  }

  public finishOrder(): void {    

    this.actualizePrice();
    
    //Create new ticket
    var newTicket: Ticket = {
      id: 0,
      idClient: this.client.id,
      creationDate: this.actualDate(),
      total: this.totalPrice,
      homeDelivery: this.homeDelivery,
      priceOfHomeDelivery: this.priceOfHomeDelivery == null ? 0 : this.priceOfHomeDelivery
    }
    
    this.ticketsService.saveTicket(newTicket).subscribe(
      response => {        
        //Edit this
        var id: number = response.id;

        newTicket.id = id;

        var productsInTickets: Array<ProductInTicket> = new Array<ProductInTicket>(0);

        this.shoppingCart.forEach(productInCart => {
          //Create relations
          var newProductInTicket: ProductInTicket = {
            id: 0,
            idTicket: id,
            name: productInCart.product.name,
            price: productInCart.product.price,
            amount: productInCart.amount            
          }

          productsInTickets.push(newProductInTicket);

          this.ticketsService.createProductInTicket(newProductInTicket).subscribe(
            response => {},
            error => {throw new Error(error)}
          );
        });
        this.ticketChild.createTicket2(newTicket, productsInTickets, this.client);
      },
      error => {throw new Error(error)}
    );

    //Actualize Amount Of Products
    var productsIds: Array<number> = new Array<number>(0);

    this.shoppingCart.forEach(productInCart => {
      productsIds.push(productInCart.product.id);
    });

    this.productsService.updateAmountIngredients(productsIds).subscribe(
      response => {},
      error => {throw new Error(error)}
    );
  }

  private actualDate(): string {
    
    var today: string | null = new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd");
    return today != null ? today : '';
  }

  public refreshPageEvent(): void {
    this.shoppingCart = new Array<ProductInCart>(0);
    this.totalPrice = 0;
    this.homeDelivery = false;
    this.priceOfHomeDelivery = null;
    
    this.refreshPage.emit(null);
  }
}