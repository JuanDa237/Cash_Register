import { Component, OnInit } from '@angular/core';

//Models
import { Ingredient } from "../../models/ingredient";

//Services
import { IngredientsService } from "../../services/ingredients/ingredients.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../../../models/datatables"; //Datatable

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
      priceByUnit: 0,
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

  private getIngredients(): void{
    
    this.ingredientsService.getIngredients().subscribe(
      response => {
        this.ingredients = response;
      },
      error => console.error(error)
    );
  }

  //Methods for html
  public changeModal(ingredient?: Ingredient): void {
    
    if(this.validateIngredient(ingredient)) {

      this.create = false;
      this.ingredient = {
        id: ingredient.id,
        name: ingredient.name,
        priceByUnit: ingredient.priceByUnit,
        amount: ingredient.amount
      };
    }
    else {
      this.create = true;
      this.ingredient = {
        id: 0,
        name: "",
        priceByUnit: 0,
        amount: 0
      };
    }
  }

  public createIngredient(): void {

    if(this.validateIngredient(this.ingredient)) {
      
      this.ingredientsService.saveIngredient(this.ingredient).subscribe(
        response => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se creo satisfactoriamente el ingrediente.',
            showConfirmButton: false,
            timer: 1500
          });
          this.getIngredients();
        },
        error => console.error(error)
      );
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  public updateIngredient(): void {

    if(this.validateIngredient(this.ingredient)) {

      this.ingredientsService.updateIngredient(this.ingredient).subscribe(
        response => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se actualizo satisfactoriamente el ingrediente.',
            showConfirmButton: false,
            timer: 1500
          });

          this.getIngredients();
        },
        error => console.error(error)
      );
    }
    else {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  public deleteIngredient(ingredient: Ingredient): void {

    if(this.validateIngredient(ingredient)) {

      this.create = false;
      this.ingredient = {
        id: ingredient.id,
        name: ingredient.name,
        priceByUnit: ingredient.priceByUnit,
        amount: ingredient.amount
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
            response => {

              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se elimino satisfactoriamente la categoria.',
                showConfirmButton: false,
                timer: 1500
              });
              
              this.getIngredients();            
            },
            error => console.error(error)
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

  private validateIngredient(ingredient: Ingredient): boolean {

    if(ingredient != null && ingredient.name.trim() != "" && ingredient.priceByUnit != null && ingredient.amount != null)
      return true;
    
    return false;
  }
}
