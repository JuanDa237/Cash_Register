import { Component, OnInit } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Product } from "../../models/product";

//Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  public products: Array<Product>;
  public product: Product;
  public filterPost: string;

  constructor(
    private productsService: ProductsService
  ) {
    this.products = null;
    this.product = {
      _id: 0,
      name: "",
      price: 0
    };
    this.filterPost = "";
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

  public deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estas seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se elimino satisfactoriamente el producto.',
          showConfirmButton: false,
          timer: 1500
        });
        this.productsService.deleteProduct(id).subscribe(
          res => {
            this.getProducts();
          },
          err => console.log(<any>err)
        );        
      }
    });      
  }
}
