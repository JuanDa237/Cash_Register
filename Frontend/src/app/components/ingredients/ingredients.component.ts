import { Component, OnInit } from '@angular/core';

import { ProductsService } from "../../services/products/products.service";
import { Ingredient } from "../../models/ingredient";

//Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {

  public ingredients: Array<Ingredient>;
  public ingredient: Ingredient;
  public create: boolean;
  public filterPost: string;

  constructor(
    private productsService: ProductsService
  ) {
    this.ingredients = null;
    this.ingredient = {
      _id: 0,
      name: "",
      amount: 0
    };
    this.filterPost = "";
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  private getIngredients() {
    this.productsService.getIngredients().subscribe(
      response => {
        if(response.length >= 0) {

          this.ingredients = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  //Methods for html
  public changeModal(id?: number, name?: string, amount?: number): void {
    if(id != null && name != null && name != "" && amount != null) {
      this.create = false;
      this.ingredient = {
        _id: id,
        name: name,
        amount: amount
      };
    }
    else {
      this.create = true;
      this.ingredient = {
        _id: 0,
        name: "",
        amount: 0
      };
    }
  }

  public createIngredient(): void {
    this.productsService.saveIngredient(this.ingredient).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se creo satisfactoriamente el ingrediente.',
          showConfirmButton: false,
          timer: 1500
        });
        this.getIngredients();
      },
      err => console.log(<any>err)
      
    );
  }

  public updateIngredient(): void {
    this.productsService.updateIngredient(this.ingredient).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se actualizo satisfactoriamente el ingrediente.',
          showConfirmButton: false,
          timer: 1500
        });
        this.getIngredients();
      },
      err => console.log(<any>err)
    );
  }

  public deleteIngredient(id?: number, name?: string, amount?: number): void {
    if(id != null && name != null && name != ""  && amount != null) {
      this.create = false;
      this.ingredient = {
        _id: id,
        name: name,
        amount: amount
      };
      Swal.fire({
        title: '¿Estas seguro de eliminar el ingrediente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.productsService.deleteIngredient(this.ingredient._id).subscribe(
            res => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se elimino satisfactoriamente la categoria.',
                showConfirmButton: false,
                timer: 1500
              });              
              this.getIngredients();            
            },
            err => console.log(<any>err)
          ); 
        }
      });
    }
  }

  public enterEvent(event: any): void {
    if(this.create) {
      this.createIngredient();      
    }
    else {
      this.updateIngredient();
    }    
  }
}
