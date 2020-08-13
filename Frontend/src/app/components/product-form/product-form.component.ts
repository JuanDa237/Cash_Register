import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from "../../models/product";
import { Ingredient } from "../../models/ingredient";
import { IngredientInProduct } from "../../models/ingredientInProduct";
import { ProductsService } from "../../services/products/products.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  public product: Product;
  public ingredients: Array<Ingredient>;
  public edit: boolean;
  public filterPost: string;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = null;
    this.ingredients = null;
    this.filterPost = "";
  }

  ngOnInit(): void {
    this.getUrlParams();
  }

  private getUrlParams(): void {
    var id: number = this.activatedRoute.snapshot.params.id;

    if(id != null) {
      this.edit = true;

      this.productsService.getProduct(id).subscribe(
        res => {
          this.product = res[0];
          this.getIngredients();                  
        },
        err => console.log(<any>err)
      );
    }
    else {

      this.edit = false;
      this.product = {
        _id: 0,      
        name: "",
        price: 0
      }

      this.getIngredients();
    }
  }

  private getIngredients(): void {
    this.productsService.getIngredients().subscribe(
      res => {
        this.ingredients = res;

        if(this.edit) {

        }
        else {

        }
      },
      err => console.log(<any>err)
    );
  }

  //html methods

  protected saveNewProduct(): void {
    
    if(this.validateProduct()) {

      this.productsService.saveProduct(this.product).subscribe(
        res => {
          var id: number = res._id[0]._id;                 

          for(let i = 0; i < this.ingredients.length; i++) {
            //Create relations
          }

          this.router.navigate(["/products"]);          
        },
        err => console.log(<any>err)
      );
    }
    else {

    }
  }

  protected updateProduct(): void {
    if(this.validateProduct()) {
      Swal.fire({
        title: '¿Estas seguro de editar el producto?',
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
            title: 'Se edito satisfactoriamente el producto.',
            showConfirmButton: false,
            timer: 1500
          })
          
          for(let i = 0; i < this.ingredients.length; i++) {
            //Update relations
          }
          
          this.productsService.updateProduct(this.product).subscribe(
            res => {
              this.router.navigate(["/products"]);
            },
            err => console.log(<any>err)           
          );
        }
      });      
    }
  }

  protected deleteProduct(): void {
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
        this.productsService.deleteProduct(this.product._id).subscribe(
          res => {
            this.router.navigate(["/products"]);
          },
          err => console.log(<any>err)
        );        
      }
    });      
  }

  //Usefull methods

  private validateProduct(): boolean {
    
    this.product.name = this.product.name.trim();

    if(this.product.name.length >= 1)  
      return true;
    
    return false;
  }

}
