import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IngredientsService } from '@modules/others/ingredients/services';
import { Ingredient, IngredientInProduct } from '@modules/others/ingredients/models';

import { ProductsService } from '../../services';

import { TableComponent } from "@modules/others/app-common/components";

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styles: [
  ]
})
export class IngredientsFormComponent implements OnInit {

  public ingredients: Array<Ingredient>;
  public ingredientsInProduct: Array<IngredientInProduct>;

  public spendingAmount: Array<number>;
  private spendingAmountConst: Array<number>;

  @ViewChild(TableComponent)
  private table!: TableComponent;

  @Output()
  public inputAmount: EventEmitter<null>;
  
  constructor(
    private ingredientsService: IngredientsService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.ingredients = new Array<Ingredient>(0);
    this.ingredientsInProduct = new Array<IngredientInProduct>(0);

    this.spendingAmount = new Array<number>(0);
    this.spendingAmountConst = new Array<number>(0);

    this.inputAmount = new EventEmitter<null>();
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  private getIngredients(): void {

    this.ingredientsService.getIngredients().subscribe(
      response => {
        this.ingredients = response;

        this.table.renderTable();
        this.getIngredientsInProduct();
      },
      error => {throw new Error(error);
      }
    );
  }

  private getIngredientsInProduct(): void {
    
    const id: number = this.activatedRoute.snapshot.params.id;
    const creating: boolean = id == null;

    if(creating) {

      this.spendingAmount.forEach(spendingAmount => spendingAmount = 0);
      this.spendingAmountConst = [...this.spendingAmount];
    }
    else {

      this.productsService.getIngredientsInProduct(id).subscribe(
        response => {
          
          this.ingredientsInProduct = response;
  
          if(this.ingredientsInProduct == null || this.ingredientsInProduct.length == 0) {
  
            this.spendingAmount.forEach((spendingAmount) => spendingAmount = 0);
          }
          else {
  
            this.ingredients.forEach((ingredient, index) => {
              this.ingredientsInProduct.forEach(ingredientInProduct => {
  
                if(ingredient.id == ingredientInProduct.idIngredient) {
                  
                  this.spendingAmount[index] = ingredientInProduct.spendingAmount;
                }
              })
            });
          }
  
          this.spendingAmountConst = [...this.spendingAmount];

          //Chart
          this.inputAmountEvent();
        },
        error => {throw new Error(error);
        }
      );
    }
  }

  //Public methods
  public createIngredientsInProduct(id: number): void {

    this.ingredients.forEach((ingredient, index) => {
      
      if(this.spendingAmount[index] != null && this.spendingAmount[index] != 0) {

        //Create Relation
        let newIngredientInProduct: IngredientInProduct = {
          id: 0,
          idProduct: id,
          idIngredient: ingredient.id,
          spendingAmount: this.spendingAmount[index]
        }

        this.productsService.createIngredientInProduct(newIngredientInProduct).subscribe(
          response => {},
          error => console.error(error)
        );
      }
    })
  }

  public updateIngredientsInProduct(idProduct: number): void {

    this.ingredients.forEach((ingredient, index) => {

      if(this.spendingAmountConst[index] != this.spendingAmount[index]) {
      
        if(this.spendingAmount[index] == 0 || this.spendingAmount[index] == null) {
          //Delete

          var idIngredientInProduct: number = 0;

          this.ingredientsInProduct.forEach((ingredientInProduct, indexTwo) => {
            
            if(ingredientInProduct.idProduct == idProduct && ingredientInProduct.idIngredient == ingredient.id)
              idIngredientInProduct = this.ingredientsInProduct[indexTwo].id;
          });

          this.productsService.deleteIngredientInProduct(idIngredientInProduct).subscribe(
            resolve => {},
            error => console.error(error)
          );
        }  
        else if(this.spendingAmountConst[index] == null) {
          
          //Create
          var newIngredientsInProduct: IngredientInProduct = {
            id: 0,
            idIngredient: ingredient.id,
            idProduct: idProduct,
            spendingAmount: this.spendingAmount[index]
          };
          
          this.productsService.createIngredientInProduct(newIngredientsInProduct).subscribe(
            resolve => {},
            error => console.error(error)
          );
        }
        else {
          //Update
          var idIngredientInProduct: number = 0;

          this.ingredientsInProduct.forEach(ingredientInProduct => {
            if(ingredient.id == ingredientInProduct.idIngredient && idProduct == ingredientInProduct.idProduct)
              idIngredientInProduct = ingredientInProduct.id;
          });

          var updatedIngredientsInProduct: IngredientInProduct = {
            id: idIngredientInProduct, 
            idIngredient: ingredient.id,
            idProduct: idProduct,
            spendingAmount: this.spendingAmount[index]
          };
          
          this.productsService.updateIngredientInProduct(updatedIngredientsInProduct).subscribe(
            resolve => {},
            error => console.error(error)
          );
        }
      }
    });
  }

  //Events
  public inputAmountEvent(): void {
    this.inputAmount.emit(null);
  }
}
