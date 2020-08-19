import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from "../../models/product";
import { Ingredient } from "../../models/ingredient";
import { IngredientInProduct } from "../../models/ingredientInProduct";
import { ProductsService } from "../../services/products/products.service";

//Sweet Alert
import Swal from 'sweetalert2';

//Datatable
import { datatableLanguage } from "../../models/datatables/datatables";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  public product: Product;
  public ingredients: Array<Ingredient>;
  public spendingAmount: Array<number>;
  public edit: boolean;  
  public dtOptions: DataTables.Settings;
  

  //New
  public ingredientsInProduct: Array<IngredientInProduct>;
  private spendingAmountConst: Array<number>;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = null;
    this.ingredients = null;
    this.spendingAmount = new Array<number>(1);
    this.spendingAmountConst = new Array<number>(1);
  }

  ngOnInit(): void {
    this.getUrlParams();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage,
      "lengthChange": false,
      "info": false
    }
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
          
          this.productsService.getIngredientsInProduct(this.product._id).subscribe(
            res => {
              this.ingredientsInProduct = res;                          

              if(this.ingredientsInProduct == null || this.ingredientsInProduct.length == 0) {
                for(let i = 0; i < this.ingredients.length; i++) {
                  this.spendingAmount[i] = null;
                }                
              }
              else {
                for(let i = 0; i < this.ingredients.length; i++) {                                                
                  for(let y = 0; y < this.ingredientsInProduct.length; y++) {                    
                    if(this.ingredients[i]._id == this.ingredientsInProduct[y].id_ingredient) {
                      
                      this.spendingAmount[i] = this.ingredientsInProduct[y].spendingAmount;
                    }
                  }               
                }
              }
              for(let i = 0; i < this.ingredients.length; i++) {                
                this.spendingAmountConst[i] = this.spendingAmount[i];
              } 
            },
            err => console.log(<any>err)
          );
        }
        else {
          for(let i = 0; i < this.ingredients.length; i++) {
            this.spendingAmount[i] = null;
            this.spendingAmountConst[i] = null;
          } 
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
            if(this.spendingAmount[i] != null && this.spendingAmount[i] != 0) {
              
              //Create Relation
              let newIngredientInProduct: IngredientInProduct = {
                id_product: id,
                id_ingredient: this.ingredients[i]._id,
                spendingAmount: this.spendingAmount[i]
              }

              this.productsService.createIngredientInProduct(newIngredientInProduct).subscribe(
                res => {},
                err => console.log(<any>err)
              );
            }
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
            
            if(this.spendingAmountConst[i] != this.spendingAmount[i]) {
            
              if(this.spendingAmount[i] == 0 || this.spendingAmount[i] == null) {
                //Delete                
                this.productsService.deleteIngredientInProduct(this.product._id, this.ingredients[i]._id).subscribe(
                  res => {},
                  err => console.log(<any>err)
                );
              }  
              else if(this.spendingAmountConst[i] == null) {
                //Create
                var newIngredientsInProduct: IngredientInProduct = {
                  id_ingredient: this.ingredients[i]._id,
                  id_product: this.product._id,
                  spendingAmount: this.spendingAmount[i]
                };

                this.productsService.createIngredientInProduct(newIngredientsInProduct).subscribe(
                  res => {},
                  err => console.log(<any>err)
                );
              }
              else {
                //Update
                var updatedIngredientsInProduct: IngredientInProduct = {
                  _id: this.ingredientsInProduct[i]._id, 
                  id_ingredient: this.ingredients[i]._id,
                  id_product: this.product._id,
                  spendingAmount: this.spendingAmount[i]
                };

                this.productsService.updateIngredientInProduct(updatedIngredientsInProduct).subscribe(
                  res => {},
                  err => console.log(<any>err)
                );
              }
          }                     
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
