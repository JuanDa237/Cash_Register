import { Component, ViewChild } from '@angular/core';
import { Client, createEmptyClient } from '@app/modules/others/clients/models';
import { Product } from '@app/modules/others/products/models';
import { ClientPickerComponent, ShoppingCartComponent } from '../../components';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html'
})
export class CashRegisterComponent {

  public client: Client;

  @ViewChild(ShoppingCartComponent)
  public shoppingCartChild!: ShoppingCartComponent;
  
  @ViewChild(ClientPickerComponent)
  public clientPickerChild!: ClientPickerComponent;

  constructor() {
    this.client = createEmptyClient();
  }

  //Html methods
  public addProductEvent(product: Product): void {
    this.shoppingCartChild.addProduct(product);
  }

  public refreshPage(): void {
    this.client = createEmptyClient();
    this.clientPickerChild.refreshPage();
  }
}