import { Component, OnInit } from '@angular/core';

//Models
import { Ingredient } from "../../models/ingredient";

//Services
import { IngredientsService } from "../../services/ingredients/ingredients.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../models/datatables/datatables"; //Datatable

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {

  public ingredients: Array<Ingredient>;
  public ingredient: Ingredient;
  public create: boolean;
  public dtOptions: DataTables.Settings;

  constructor(
    private ingredientsService: IngredientsService
  ) {
    this.ingredients = null;
    this.ingredient = {
      id: 0,
      name: "",
      amount: 0
    };    
  }

  ngOnInit(): void {
    
    this.getIngredients();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
  }

  private getIngredients() {
    this.ingredientsService.getIngredients().subscribe(
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
        id: id,
        name: name,
        amount: amount
      };
    }
    else {
      this.create = true;
      this.ingredient = {
        id: 0,
        name: "",
        amount: 0
      };
    }
  }

  public createIngredient(): void {
    this.ingredientsService.saveIngredient(this.ingredient).subscribe(
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
    this.ingredientsService.updateIngredient(this.ingredient).subscribe(
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
        id: id,
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
          this.ingredientsService.deleteIngredient(this.ingredient.id).subscribe(
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
