import { Component, OnInit } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Product } from "../../models/product";

//Sweet Alert
import Swal from 'sweetalert2';

interface Client {  
  name: string;
  domicile: boolean;
  address?: string;
  phoneNumber?: string;
}

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html'
})
export class CashRegisterComponent implements OnInit {

  public client: Client;
  public products: Array<Product>;
  public filterPost: string;
  public shoppingCart: Array<Product>;
  public totalPrice: number;

  constructor(
    private productsService: ProductsService
  ) {
    this.client = {
      name: "",
      domicile: false      
    };
    this.products = null;
    this.filterPost = "";
    this.shoppingCart = new Array<Product>(0);
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    this.getProducts();
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

  //Html methods

  public addProduct(product: Product): void {
    this.shoppingCart.push(product);    
    this.actualizePrice();
  }

  public deleteProduct(index: number): void {
    this.shoppingCart.splice(index, 1);
    this.actualizePrice();
  }

  private actualizePrice(): void {
    
    this.totalPrice = 0;
    for(var i = 0; i < this.shoppingCart.length; i++) {
      this.totalPrice += this.shoppingCart[i].price;
    }
  }

  public finishOrder(): void {
    
    var products: Array<number> = new Array<number>(0);

    for(var i = 0; i < this.shoppingCart.length; i++) {
      products.push(this.shoppingCart[i]._id);
    }

    this.productsService.updateAmountIngredients(products).subscribe(
      res => {},
      err => console.log(<any>err)
    );
  }

  public refreshPage(): void {
    this.client = {
      name: "",
      domicile: false      
    };
    this.products = null;
    this.filterPost = "";
    this.shoppingCart = new Array<Product>(0);
    this.totalPrice = 0;
    this.getProducts();
  }
}
