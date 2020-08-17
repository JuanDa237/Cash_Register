import { Component, OnInit } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Product } from "../../models/product";

interface Client {  
  name: string;
  domicile: boolean;
  address?: string;
  phoneNumber?: string;
}

interface productInCart {
  product: Product;
  amount: number;
}

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html'
})
export class CashRegisterComponent implements OnInit {

  public client: Client;
  public products: Array<Product>;
  public filterPost: string;
  public shoppingCart: Array<productInCart>;
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
    this.shoppingCart = new Array<productInCart>(0);
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
        
    const newProduct: productInCart = {
      product: {
        _id: product._id,
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

  private actualizePrice(): void {
    
    this.totalPrice = 0;    

    for(var i = 0; i < this.shoppingCart.length; i++) {

      var amount: number = this.shoppingCart[i].amount;
      this.shoppingCart[i].product.price = 0;

      if(amount <= 0 || amount == null) {

        this.deleteProduct(i);
        break;
      }      

      var id: number = this.shoppingCart[i].product._id;

      var indexProduct = this.products.findIndex(function(product) {

        if(product._id == id)
          return product;
      });

      var priceForOne: number = this.products[indexProduct].price;

      this.totalPrice +=  priceForOne * amount;      
      this.shoppingCart[i].product.price = priceForOne * amount;      
    }      
  }

  public finishOrder(): void {
    
    var products: Array<number> = new Array<number>(0);

    for(var i = 0; i < this.shoppingCart.length; i++) {
      
      for(var x = 0; x < this.shoppingCart[i].amount; x++) {
        console.log("Entro");
        products.push(this.shoppingCart[i].product._id);
      }      
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
    this.shoppingCart = new Array<productInCart>(0);
    this.totalPrice = 0;
    this.getProducts();
  }
}
