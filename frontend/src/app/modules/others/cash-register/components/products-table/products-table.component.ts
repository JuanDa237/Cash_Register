import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TableComponent } from '@app/modules/others/app-common/components';
import { Product } from '@app/modules/others/products/models';
import { ProductsService } from '@app/modules/others/products/services';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html'
})
export class ProductsTableComponent implements OnInit {

  public products: Array<Product>;

  @ViewChild(TableComponent)
  private table!: TableComponent;

  @Output()
  public addProduct: EventEmitter<Product>;

  constructor(
    private productsService: ProductsService
  ) {
    this.products = new Array<Product>(0);

    this.addProduct = new EventEmitter<Product>();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    
    this.productsService.getProducts().subscribe(
      response => {
        this.products = response;

        this.table.renderTable();
      },
      error => {throw new Error(error)}
    );
  }

  //Html methods
  public addProductEvent(index: number): void {
    this.addProduct.emit(this.products[index]);
  }
}